import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private prisma: PrismaService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const user = req.user; // Populated by AuthGuard

        return next
            .handle()
            .pipe(
                tap(async () => {
                    if (user) {
                        try {
                            // Log simple operation
                            // We use 'SystemLog' or 'OperationLog'. Let's use SystemLog as it matches schema better or OperationLog.
                            // Schema has 'OperationLog'.
                            await this.prisma.operationLog.create({
                                data: {
                                    userId: user.id || user.sub, // Strategy returns object
                                    action: method,
                                    module: url,
                                    details: { body: req.body, query: req.query },
                                }
                            });
                        } catch (e) {
                            console.error('Failed to log operation', e);
                        }
                    }
                }),
            );
    }
}

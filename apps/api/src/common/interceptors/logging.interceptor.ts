import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    constructor(private auditService: AuditService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;

        // Only log mutation methods (POST, PUT, DELETE, PATCH)
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
            return next.handle().pipe(
                tap(() => {
                    // Assumes AuthGuard works and populates req.user
                    const user = req.user;

                    if (user && (user.sub || user.id)) {
                        this.auditService.logOperation({
                            userId: user.sub || user.id,
                            action: method,
                            module: this.extractModule(url),
                            details: {
                                path: url,
                                body: this.sanitizeBody(req.body),
                                params: req.params,
                                query: req.query
                            }
                        });
                    }
                }),
            );
        }

        return next.handle();
    }

    private extractModule(url: string): string {
        // Extract first segment after /api/
        // e.g. /api/design/create -> design
        const match = url.match(/\/api\/([^\/]+)/);
        return match ? match[1] : 'unknown';
    }

    private sanitizeBody(body: any): any {
        if (!body) return null;
        const sanitized = { ...body };
        // Remove sensitive fields
        if (sanitized.password) sanitized.password = '***';
        if (sanitized.token) sanitized.token = '***';
        return sanitized;
    }
}

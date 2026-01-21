import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) { }

    async logOperation(params: {
        userId: string;
        action: string;
        module: string;
        details?: any;
    }) {
        try {
            await this.prisma.operationLog.create({
                data: {
                    userId: params.userId,
                    action: params.action,
                    module: params.module,
                    details: params.details ? params.details : undefined,
                },
            });
        } catch (error) {
            console.error('Failed to write audit log:', error);
            // Non-blocking: don't fail the request just because logging failed
        }
    }
}

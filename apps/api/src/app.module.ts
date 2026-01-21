import { Module, MiddlewareConsumer, RequestMethod, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaService } from './common/prisma/prisma.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuditService } from './common/audit/audit.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        AdminModule,
        // Other modules will be imported here as they are built
    ],
    providers: [
        AuditService,
        PrismaService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}

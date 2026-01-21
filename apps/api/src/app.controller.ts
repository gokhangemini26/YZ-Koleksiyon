import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getRoot() {
        return {
            name: 'FashionERP API',
            version: '1.0.0',
            status: 'running',
            timestamp: new Date().toISOString(),
            endpoints: {
                auth: {
                    login: 'POST /api/auth/login',
                    register: 'POST /api/auth/register',
                    profile: 'GET /api/auth/profile',
                },
                admin: {
                    dashboard: 'GET /api/admin/dashboard',
                    toggles: 'POST /api/admin/toggles',
                    apiKeys: 'PUT /api/admin/api-keys',
                },
            },
        };
    }

    @Get('health')
    healthCheck() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
}

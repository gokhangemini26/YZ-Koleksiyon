import { Controller, Get, Post, Body, UseGuards, Put } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Permission } from '../../../../../packages/shared/src/rbac_policy';
import { RequirePermission } from '../../common/decorators/require-permissions.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {

    // Endpoint 1: System Health & Stats
    @Get('dashboard')
    @RequirePermission(Permission.MANAGE_SYSTEM)
    getDashboardStats() {
        return {
            systemStatus: 'OPERATIONAL',
            activeUsers: 42,
            aiServiceLoad: '12%',
            dailyVisualGenerations: 156,
            estimatedCostToday: '$14.50'
        };
    }

    // Endpoint 2: Feature Toggles (Kill Switch)
    @Post('toggles')
    @RequirePermission(Permission.MANAGE_SYSTEM)
    updateFeatureToggle(@Body() body: { feature: string, enabled: boolean }) {
        // In real app, this updates Redis/DB
        console.log(`[AUDIT] Feature Toggle: ${body.feature} set to ${body.enabled}`);
        return { success: true, message: `Feature ${body.feature} updated.` };
    }

    // Endpoint 3: API Key Management
    @Put('api-keys')
    @RequirePermission(Permission.MANAGE_SYSTEM)
    rotateApiKey(@Body() body: { service: 'OPENAI' | 'STABILITY', newKeyHash: string }) {
        // Logic to securely update the key vault
        return { success: true, status: 'Key Rotated' };
    }
}

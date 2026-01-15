import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, RBAC_MATRIX, Permission } from '@fashion-erp/shared/rbac_policy';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermission = this.reflector.get<Permission>('permission', context.getHandler());
        if (!requiredPermission) {
            return true; // No specific permission required
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Populated by AuthGuard (JWT Strategy)

        if (!user || !user.role) {
            throw new ForbiddenException('User role not found');
        }

        const userPermissions = RBAC_MATRIX[user.role as UserRole];

        // Check 1: Does the Role have the Permission?
        if (!userPermissions.includes(requiredPermission)) {
            throw new ForbiddenException(`Role ${user.role} lacks permission: ${requiredPermission}`);
        }

        // Check 2: Mod 11 Logic (Admin Module)
        // Extra safety net: If resource is 'admin', strictly enforce GM/ADMIN
        const path = request.path;
        if (path.startsWith('/admin') && user.role === UserRole.MODULE_USER) {
            throw new ForbiddenException('Module 11 Access Restricted to Admin/GM');
        }

        return true;
    }
}

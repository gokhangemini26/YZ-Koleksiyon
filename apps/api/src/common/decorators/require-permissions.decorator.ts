import { SetMetadata } from '@nestjs/common';
import { Permission } from '@fashion-erp/shared/rbac_policy';

export const RequirePermission = (permission: Permission) => SetMetadata('permission', permission);

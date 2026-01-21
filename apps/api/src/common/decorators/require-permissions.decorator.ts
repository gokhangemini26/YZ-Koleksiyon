import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../../../../packages/shared/src/rbac_policy';

export const RequirePermission = (permission: Permission) => SetMetadata('permission', permission);

// RBAC Policy Definitions
// Enforced by API Guard Middleware and Database RLS

export enum UserRole {
    GM = 'GM',
    ADMIN = 'ADMIN',
    MODULE_USER = 'MODULE_USER',
}

export enum Permission {
    // Generic
    VIEW = 'view',
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete',
    APPROVE = 'approve',

    // Specific
    VIEW_FINANCIALS = 'view_financials', // See margins/costs
    MANAGE_SYSTEM = 'manage_system',     // Admin Module
    USE_AI_GENERATION = 'use_ai_generation',
}

export const RBAC_MATRIX: Record<UserRole, Permission[]> = {
    [UserRole.GM]: [
        Permission.VIEW,
        Permission.CREATE,
        Permission.EDIT,
        Permission.DELETE,
        Permission.APPROVE,
        Permission.VIEW_FINANCIALS,
        Permission.MANAGE_SYSTEM, // God Mode
        Permission.USE_AI_GENERATION,
    ],
    [UserRole.ADMIN]: [
        Permission.VIEW,
        Permission.VIEW_FINANCIALS,
        Permission.MANAGE_SYSTEM, // Technical Control
        Permission.USE_AI_GENERATION,
    ],
    [UserRole.MODULE_USER]: [
        Permission.VIEW,
        Permission.CREATE,
        Permission.EDIT,
        Permission.USE_AI_GENERATION,
        // NO financial view, NO approve, NO system manage
    ],
};

// Department Filtering logic
// Even if you have 'VIEW', you can only view items matching your Department Tag
// unless you are GM/Admin.

export type AccessContext = {
    role: UserRole;
    departmentTags: string[];
};

export function canAccessModule(context: AccessContext, moduleNumber: number): boolean {
    if (context.role === UserRole.GM) return true;
    if (context.role === UserRole.ADMIN) return true;

    // Mod 11 is strictly forbidden for normal users
    if (moduleNumber === 11) return false;

    return true;
}

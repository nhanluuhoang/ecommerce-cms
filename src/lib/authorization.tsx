import React, { useCallback } from 'react';
import { Profile } from '../pages/auth/interfaces'
import { useAuth } from '../providers/AuthProvider';

export enum ROLES {
    super_admin = 'super_admin',
    user = 'user',
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
    'SUPER_ADMIN': (user: Profile) => {
        if (user.role === 'super_admin') {
            return true;
        }
        return false;
    },
};

export const useAuthorization = () => {
    const { user } = useAuth()
    
    if (!user?.role) {
        throw Error('User does not exist!');
    }
    
    const checkAccess = useCallback(
        ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
            if (allowedRoles && allowedRoles.length > 0) {
                return allowedRoles?.includes(user.role);
            }
            
            return true;
        },
        [user.role]
    );
    
    return { checkAccess, role: user.role };
};

type AuthorizationProps = {
    forbiddenFallback?: React.ReactNode;
    children: React.ReactNode;
} & (
    | {
    allowedRoles: RoleTypes[];
    policyCheck?: never;
}
    | {
    allowedRoles?: never;
    policyCheck: boolean;
}
    );

export const Authorization = (
    {
      policyCheck,
      allowedRoles,
      forbiddenFallback = null,
      children,
    }: AuthorizationProps) => {
    const { checkAccess } = useAuthorization();
    
    let canAccess = false;
    
    if (allowedRoles) {
        canAccess = checkAccess({ allowedRoles });
    }
    
    if (typeof policyCheck !== 'undefined') {
        canAccess = policyCheck;
    }
    
    return <>{canAccess ? children : forbiddenFallback}</>;
};

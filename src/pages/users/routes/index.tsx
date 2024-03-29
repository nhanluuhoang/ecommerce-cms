import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Users } from './Users';
import { User } from './User';
import { Authorization, POLICIES } from '../../../lib/authorization';
import { Profile } from '@/pages/auth';
import { useAuth } from '../../../providers/AuthProvider';

export const UserRoutes = () => {
    const { user } = useAuth()
    
    return (
        <Authorization policyCheck={POLICIES['SUPER_ADMIN'](user as Profile)}>
            <Routes>
                <Route path='' element={<Users />} />
                <Route path=':userId' element={<User />} />
                <Route path="*" element={<Navigate to="." />} />
            </Routes>
        </Authorization>
    );
};

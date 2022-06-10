import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Categories } from './Categories';
import { Category } from './Category';
import { Authorization, POLICIES } from '../../../lib/authorization';
import { Profile } from '@/pages/auth';
import { useAuth } from '../../../providers/AuthProvider';

export const CategoryRoutes = () => {
    const { user } = useAuth()
    
    return (
        <Authorization policyCheck={POLICIES['SUPER_ADMIN'](user as Profile)}>
            <Routes>
                <Route path='' element={<Categories />} />
                <Route path=':categoryId' element={<Category />} />
                <Route path="*" element={<Navigate to="." />} />
            </Routes>
        </Authorization>
    );
};

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Products } from './Products';
import { Product } from './Product';
import { Authorization, POLICIES } from '../../../lib/authorization';
import { Profile } from '@/pages/auth';
import { useAuth } from '../../../providers/AuthProvider';

export const ProductRoutes = () => {
    const { user } = useAuth()
    
    return (
        <Authorization policyCheck={POLICIES['SUPER_ADMIN'](user as Profile)}>
            <Routes>
                <Route path='' element={<Products />} />
                <Route path=':productId' element={<Product />} />
                <Route path="*" element={<Navigate to="." />} />
            </Routes>
        </Authorization>
    );
};

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Users } from './Users';
import { User } from './User';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<Users />} />
            <Route path=':userId' element={<User />} />
            <Route path="*" element={<Navigate to="." />} />
        </Routes>
    );
};

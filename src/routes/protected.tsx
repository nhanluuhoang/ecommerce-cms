import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { lazyImport } from '../services/utils/lazyImport';
import { NotFound } from '../pages/misc';

const { Dashboard } = lazyImport(() => import('../pages/misc'), 'Dashboard');
const { UserRoutes } = lazyImport(() => import('../pages/users'), 'UserRoutes');

const App = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export const protectedRoutes = [
    {
        path: '/dashboard',
        element: <App />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/dashboard/users/*', element: <UserRoutes /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];

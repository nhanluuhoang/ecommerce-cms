import { lazyImport } from '../services/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('../pages/auth'), 'AuthRoutes');

export const publicRoutes = [
    {
        path: '/*',
        element: <AuthRoutes />,
    },
];

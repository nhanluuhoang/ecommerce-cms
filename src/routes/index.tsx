import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { NotFound } from '../pages/misc';
import { useAuth } from '../providers/AuthProvider';

export const AppRoutes = () => {
    const { user } = useAuth()
    
    const commonRoutes = [{ path: '/not-found', element: <NotFound/> }];
    
    const routes = user ? protectedRoutes : publicRoutes;
    
    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};

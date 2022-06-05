import { LoginForm } from '../components/LoginForm';
import { useTitle } from '../../../hooks/useTitle';

export const Login = () => {
    
    useTitle('Login')
    
    return (
        <LoginForm />
    );
};

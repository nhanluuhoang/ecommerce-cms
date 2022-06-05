import React, { useEffect } from 'react';
import { InputField } from '../../../components/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { login, loadUser } from '../../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/elements';
import { LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../../../providers/AuthProvider';

const schema = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

type formData = {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth()
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting, errors },
    } = useForm<formData>({
        resolver: yupResolver(schema)
    });

    const handleSignIn: SubmitHandler<formData> = async ({email, password}) => {
        if (!isValid) return;
        const token = await login({email, password})
        
        if (token) {
            const userInfo = await loadUser()
            setUser(userInfo.data)
            navigate('/dashboard')
        }
    }
    
    // init email and password
    useEffect(() => {
        reset({
            email: 'super-admin@gmail.com',
            password: 'password'
        })
    }, [reset])
    
    
    return (
        <div id='login'>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <InputField
                    name='email'
                    label='Email'
                    inputCol='10'
                    classRequired={true}
                    registration={register('email')}
                    error={errors['email']}
                />
                <InputField
                    name='password'
                    label='Password'
                    type='password'
                    inputCol='10'
                    classRequired={true}
                    registration={register('password')}
                    error={errors['password']}
                />
                <div style={{width: '100%', justifyContent: 'center', textAlign: 'center'}}>
                    <Button
                        isLoading={isSubmitting}
                        type='submit'
                        icon={<LoginOutlined />}
                    >
                        Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

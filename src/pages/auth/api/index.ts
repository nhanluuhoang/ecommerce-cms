import { axios } from '../../../lib/axios'
import { LoginResponse } from '../interfaces'
import { AuthUser } from '../interfaces';

export interface LoginCredentialsDTO {
    email: string
    password: string
}

const signIn = (data: LoginCredentialsDTO): Promise<LoginResponse> => {
    return axios.post('/login', data);
}

const getUser = (): Promise<AuthUser> => {
    return axios.get('/me');
};

const signOut = () => {
    return axios.delete('/logout');
}

export {
    signIn,
    getUser,
    signOut
}


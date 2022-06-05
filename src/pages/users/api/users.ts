import { axios } from '../../../lib/axios'
import { IGetUsers, IGetUser, IUpdateUserDTO } from '../interfaces';

const updateUser = (id: string, data: IUpdateUserDTO): Promise<null> => {
    return axios.post(`/users/${id}`, data);
}

const getUsers = (params: object): Promise<IGetUsers> => {
    return axios.get('/users?', {
        params: params
    });
};

const getUser = (id: string | undefined): Promise<IGetUser> => {
    return axios.get(`/users/${id}`);
}

export { getUsers, getUser, updateUser }

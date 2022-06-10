import { axios } from '../../../lib/axios'
import { IGetCategories, IGetCategory, UpdateDTO } from '../interfaces';

const getCategories = (): Promise<IGetCategories> => {
    return axios.get('/categories');
};

const getCategory = (id: string | undefined): Promise<IGetCategory> => {
    return axios.get(`/categories/${id}`);
}

const updateCategory = (id: any, body: UpdateDTO): Promise<IGetCategory> => {
    return axios.put(`/categories/${id}`, body);
}

const deleteCategory = (id: any):  Promise<IGetCategory> => {
    return axios.delete(`/categories/${id}`);
}

export { getCategories, getCategory, updateCategory, deleteCategory }

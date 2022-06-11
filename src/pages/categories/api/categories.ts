import { axios } from '../../../lib/axios'
import { CategoryDTO, IGetCategories, IGetCategory } from '../interfaces';

const getCategories = (): Promise<IGetCategories> => {
    return axios.get('/categories');
};

const getCategory = (id: any): Promise<IGetCategory> => {
    return axios.get(`/categories/${id}`);
}

const createCategory = (body: CategoryDTO): Promise<IGetCategory> => {
    return axios.post(`/categories`, body);
}

const updateCategory = (id: any, body: CategoryDTO): Promise<IGetCategory> => {
    return axios.put(`/categories/${id}`, body);
}

const deleteCategory = (id: any):  Promise<IGetCategory> => {
    return axios.delete(`/categories/${id}`);
}

export { getCategories, getCategory, updateCategory, deleteCategory, createCategory }

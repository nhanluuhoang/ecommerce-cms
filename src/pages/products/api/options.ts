import { axios } from '../../../lib/axios'
import { OptionDTO, IGetOptions, IGetOption } from '../interfaces';

const getOptions = (): Promise<IGetOptions> => {
    return axios.get('/options');
};

const getOption = (id: any): Promise<IGetOption> => {
    return axios.get(`/options/${id}`);
};

const createOption = (body: OptionDTO): Promise<any> => {
    return axios.get('/options');
};

export { getOptions, getOption, createOption }

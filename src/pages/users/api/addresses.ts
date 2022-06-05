import { axios } from '../../../lib/axios'
import { IAddressParams, IGetAddresses } from '../interfaces';

const getAddresses = (params: IAddressParams): Promise<IGetAddresses> => {
    return axios.get('/addresses?', {
        params: params
    });
};

export { getAddresses }

import { axios } from '../../../lib/axios'
import { ProductDTO, IParams, IGetProducts, IGetProduct } from '../interfaces';

const getProducts = (params: IParams): Promise<IGetProducts> => {
    return axios.get('/products?', { params })
}

const getProduct = (id: any): Promise<IGetProduct> => {
    return axios.get(`/products/${id}`)
}

const createProduct = (body: ProductDTO): Promise<any> => {
    return axios.post('/products', body)
}

export { createProduct, getProducts, getProduct }

import Axios, { AxiosRequestConfig } from 'axios'
import { API_URL } from '../config'
import storage from '../services/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
    config.headers = {
        'Accept': 'application/js',
        'Content-Type': 'application/json'
    }

    const token = storage.getToken()
    
    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        }
    }

    return config
}

export const axios = Axios.create({
    baseURL: API_URL
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const message = error.response?.data?.message || error.message
        storage.clearToken()

        return Promise.reject(message)
    }
);

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error)
    }
);

export const get = (url, config = {}) => api.get(url, config);
export const post = (url, data, config = {}) => api.post(url, data, config);
export const patch = (url, data, config = {}) => api.patch(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);

export default api;

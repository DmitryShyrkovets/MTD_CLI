import axios from 'axios';
import {baseURL} from "./config"

export const api = axios.create({ baseURL });

api.interceptors.request.use(
    function (config) {
        api.defaults.headers['Content-Type'] = 'application/json';
        api.defaults.withCredentials = true;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);
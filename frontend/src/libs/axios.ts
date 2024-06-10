import axios from 'axios';
import { getCookie } from 'cookies-next';
import { env } from '../utils/function';

axios.defaults.baseURL = env('AUTH_SERVER');
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const accessToken = getCookie('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

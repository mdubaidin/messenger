'use client';

import axios from 'axios';
import { getCookie } from 'cookies-next';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const accessToken = getCookie('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

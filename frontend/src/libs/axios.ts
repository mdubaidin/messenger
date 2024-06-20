'use client';

import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config) {
//     const accessToken = getCookie('access_token');
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
// });

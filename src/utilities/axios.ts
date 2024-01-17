import axios from 'axios';
import { getCookie } from 'cookies-next';

axios.defaults.baseURL = process.env.AUTH_SERVER;

const accessToken = getCookie('accessToken');

const authServer = axios.create({
    baseURL: 'http://localhost:8000',
    // headers: {
    //     Authorization: `Bearer ${accessToken}`,
    // },
});

export { authServer };

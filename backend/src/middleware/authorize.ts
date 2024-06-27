import { Handler } from 'express';
import CustomError from '../classes/CustomError.js';

const authorize: Handler = (req, res, next) => {
    const authKey = req.headers.authorization;
    console.log('Auth key: ' + authKey);

    if (!authKey || authKey !== process.env.API_KEY) {
        return CustomError.throw('Unauthorized', 401);
    }
    next();
};

export default authorize;

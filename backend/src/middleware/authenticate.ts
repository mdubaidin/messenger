import { Handler } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import CustomError from '../classes/CustomError.js';
import fs from 'fs';
import { Types } from 'mongoose';
import { JwtUser } from '../models/User.js';

const PUBLIC_KEY = fs.readFileSync('./certs/private.pem', 'utf8');

const authenticate: Handler = function authenticate(req, res, next) {
    try {
        if (typeof req.headers.authorization !== 'string')
            return CustomError.throw('Provided Auth token is invalid');

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return CustomError.throw('JWT must be provided', 401);

        const user = Jwt.verify(token, PUBLIC_KEY) as JwtUser;

        req.user = user;
        req.user._id = new Types.ObjectId(user.id);

        next();
    } catch (err: any) {
        console.log(err);
        res.status(401).error(err.message || 'Unauthorized access');
    }
};

export default authenticate;

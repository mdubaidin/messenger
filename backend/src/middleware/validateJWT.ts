import { Handler } from 'express';
import Jwt from 'jsonwebtoken';
import CustomError from '../classes/CustomError.js';
import User, { JwtUser } from '../models/User.js';
import { isTokenExpire, setTokenCookies } from '../utils/jwt/token.js';
import { generateJWT } from '../utils/jwt/jwt.js';

type Token = string | undefined;

const validateJWT: Handler = async (req, res, next) => {
    try {
        const accessToken: Token =
            req.cookies.access_token || req.headers.authorization?.replace('Bearer', '');
        const refreshToken: Token = req.cookies.refresh_token;

        // console.log('refresh', refreshToken, 'access', accessToken);

        if (!accessToken) return CustomError.throw('JWT access token must be provided', 401);

        if (refreshToken && isTokenExpire(accessToken)) {
            if (isTokenExpire(refreshToken))
                return CustomError.throw('Your session has been expired. Login again', 401);

            const decode = Jwt.verify(refreshToken, process.env.JWT_SECRET as string) as JwtUser;

            const user = await User.findById(decode.id);

            if (!user) return CustomError.throw('Refresh token is invalid', 401);

            const { accessToken: accessT, refreshToken: refreshT } = await generateJWT(user);

            req.headers.accessToken = accessT;
            req.headers.refreshToken = refreshT;
            setTokenCookies(res, accessT, refreshT);
            return next();
        }

        req.headers.accessToken = accessToken;
        req.headers.refreshToken = refreshToken;
        next();
    } catch (err: any) {
        console.log(err);
        res.status(401).error(err.message || 'Unauthorized access');
    }
};

export default validateJWT;

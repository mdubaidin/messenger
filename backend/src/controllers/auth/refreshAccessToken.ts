// import { signAccessToken, signRefreshToken } from '../../utils/functions.js';
import { Handler } from 'express';
import User, { JwtUser } from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import { clearCookie, setCookie } from '../../utils/cookies.js';
import jwt from 'jsonwebtoken';
import { generateJWT } from '../../utils/jwt/jwt.js';
import { getAccessToken } from '../../utils/jwt/token.js';

const refreshAccessToken: Handler = async function (req, res, next) {
    try {
        const token = req.body.refreshToken || req.cookies.refresh_token;

        if (!token) return CustomError.throw('Refresh token must be provided', 401);

        const decode = jwt.verify(token, process.env.JWT_SECRET as string) as JwtUser;

        const user = await User.findById(decode.id);

        if (!user) return CustomError.throw('Refresh token is invalid', 404);

        const { accessToken, refreshToken } = await generateJWT(user);

        setCookie(res, 'access_token', accessToken);
        setCookie(res, 'refresh_token', refreshToken);

        res.success({
            user,
            accessToken,
            refreshToken,
        });
    } catch (e: any) {
        console.log(e);
        res.status(401).error(e?.message || 'refresh token is invalid');
    }
};

export default refreshAccessToken;

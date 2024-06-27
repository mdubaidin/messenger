import User, { JwtUser } from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateJWT } from '../../utils/jwt/jwt.js';
import { CookieOptions, Response } from 'express';

export type Token = {
    readonly accessToken?: string;
    readonly refreshToken?: string;
};

const cookieConfig: CookieOptions = {
    secure: true,
    httpOnly: true,
    // sameSite: 'strict',
};

const getAccessToken = async (refresh_token: string): Promise<Token> => {
    const decode = jwt.verify(refresh_token, process.env.JWT_SECRET as string) as JwtUser;

    const user = await User.findById(decode.id);

    if (!user) {
        CustomError.throw('Refresh token is invalid', 401);
        return {};
    }

    const { accessToken, refreshToken } = await generateJWT(user);

    return { accessToken, refreshToken };
};

const isTokenExpire = (accessToken: string) => {
    const decodedToken = jwt.decode(accessToken) as JwtPayload;
    if (!decodedToken) return true;

    const now = Date.now() / 1000;
    return decodedToken.exp ? decodedToken.exp < now : true;
};

const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie('access_token', accessToken);
    res.cookie('refresh_token', refreshToken);
};

const clearTokenCookies = (res: Response) => {
    res.clearCookie('access_token', cookieConfig);
    res.clearCookie('refresh_token', cookieConfig);
};

export { getAccessToken, isTokenExpire, setTokenCookies, clearTokenCookies };

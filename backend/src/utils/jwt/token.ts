import User, { JwtUser, UserDocument } from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateJwtPair } from '../../utils/jwt/jwt.js';
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
        new CustomError('Refresh token is invalid', 401);
        return {};
    }

    const { accessToken, refreshToken } = await generateJwtPair(user);

    return { accessToken, refreshToken };
};

const isAccessTokenExpire = (accessToken: string) => {
    const decodedToken = jwt.decode(accessToken) as JwtPayload;
    if (!decodedToken) return true;

    const now = Date.now() / 1000;
    return decodedToken.exp ? decodedToken.exp < now : true;
};

const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie('jwt-auth.access-token', accessToken);
    res.cookie('jwt-auth.refresh-token', refreshToken);
};

const clearTokenCookies = (res: Response) => {
    res.clearCookie('jwt-auth.access-token', cookieConfig);
    res.clearCookie('jwt-auth.refresh-token', cookieConfig);
};

export { getAccessToken, isAccessTokenExpire, setTokenCookies, clearTokenCookies };

import { Types } from 'mongoose';
import { UserDocument } from '../../models/User.js';

export type Token = {
    readonly accessToken: string;
    readonly refreshToken: string;
};

const generateAccessToken = (user: UserDocument) => {
    return user.signAccessToken();
};

const generateRefreshToken = async (user: UserDocument) => {
    const refreshToken = user.signRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    console.log('refresh token saved');
    return refreshToken;
};

const generateJwtPair = async (user: UserDocument) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return { accessToken, refreshToken };
};

export { generateJwtPair, generateAccessToken, generateRefreshToken };

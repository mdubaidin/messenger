import { Types } from 'mongoose';
import { UserDocument } from '../../models/User.js';

export type Token = {
    readonly accessToken: string;
    readonly refreshToken: string;
};

const generateJWT = async (user: UserDocument) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

export { generateJWT };

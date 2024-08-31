import User from '../../../models/User.js';
import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import { setTokenCookies } from '../../../utils/jwt/token.js';
import { generateJwtPair } from '../../../utils/jwt/jwt.js';
import { generateRandomBytes } from '../../../utils/functions.js';

const createAccount: Handler = async function (req, res, next) {
    try {
        const { providerId, name, email, picture, provider } = req.body;

        if (!providerId) throw new CustomError('Provider Id must be provided');

        if (!provider) throw new CustomError('Provider name must be provided');

        let user = null;

        user = await User.findOne({ providerId });

        const random = generateRandomBytes(6, { alphabets: true });
        const username = name.replace(/\s/g, '').toLowerCase() + '_' + random;

        if (!user) {
            user = new User({
                username,
                name,
                email,
                picture,
                provider,
                providerId,
                password: providerId,
            });

            await user.save();
        }

        const { accessToken, refreshToken } = await generateJwtPair(user);
        setTokenCookies(res, accessToken, refreshToken);
        const userInfo = user.removeSensitiveInfo();

        res.success({
            ...userInfo,
            accessToken,
            refreshToken,
        });
    } catch (e) {
        next(e);
    }
};

export default createAccount;

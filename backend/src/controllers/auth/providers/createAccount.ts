import User from '../../../models/User.js';
import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import { setTokenCookies } from '../../../utils/jwt/token.js';
import { generateJWT } from '../../../utils/jwt/jwt.js';

const createAccount: Handler = async function (req, res, next) {
    try {
        const { providerId, name, email, picture, provider } = req.body;

        if (!providerId) return CustomError.throw('Provider Id must be provided');

        if (!provider) return CustomError.throw('Provider name must be provided');

        let user = null;

        user = await User.findOne({ providerId });

        if (!user) {
            user = new User({
                name,
                email,
                picture,
                provider,
                providerId,
                password: providerId,
            });

            await user.save();
        }

        const { accessToken, refreshToken } = await generateJWT(user);

        setTokenCookies(res, accessToken, refreshToken);

        res.success({
            user: user.removeSensitiveInfo(),
            accessToken,
            refreshToken,
        });
    } catch (e) {
        next(e);
    }
};

export default createAccount;

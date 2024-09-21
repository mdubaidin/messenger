// import { signAccessToken, signRefreshToken } from '../../utils/functions.js';
import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import { generateJwtPair } from '../../utils/jwt/jwt.js';
import { setTokenCookies } from '../../utils/jwt/token.js';
import { emailValidator, usernameValidator } from '../../utils/validators.js';

const login: Handler = async function (req, res, next) {
    const { user, password } = req.body;

    const email = emailValidator(user) ? user : undefined;
    const username = usernameValidator(user) ? user : undefined;

    try {
        const query = { $or: [{ email }, { username }] };
        const user = await User.findOne(query);

        if (!user)
            throw new CustomError(
                `Sorry, your password was incorrect. Please double-check your password.`,
                400
            );

        if (await user.isUnauthorized(password))
            throw new CustomError(
                'Sorry, your password was incorrect. Please double-check your password.',
                400
            );

        const { accessToken, refreshToken } = await generateJwtPair(user);

        const userInfo = user.removeSensitiveInfo();

        setTokenCookies(res, accessToken, refreshToken);

        res.success({
            ...userInfo,
            accessToken,
            refreshToken,
        });
    } catch (e) {
        next(e);
    }
};

export default login;

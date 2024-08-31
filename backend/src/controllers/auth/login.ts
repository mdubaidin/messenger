// import { signAccessToken, signRefreshToken } from '../../utils/functions.js';
import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import { generateJwtPair } from '../../utils/jwt/jwt.js';
import { setTokenCookies } from '../../utils/jwt/token.js';

const login: Handler = async function (req, res, next) {
    const { username, email, password } = req.body;

    try {
        const query = { $or: [{ email }, { username }] };
        const user = await User.findOne(query);

        if (!user) throw new CustomError(`We can't find account with ${email}`, 404);

        if (await user.isUnauthorized(password))
            throw new CustomError('The password you entered is incorrect, Please try again', 404);

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

export { login };

// import { signAccessToken, signRefreshToken } from '../../utils/functions.js';
import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import { generateJWT } from '../../utils/jwt/jwt.js';
import { setTokenCookies } from '../../utils/jwt/token.js';

const login: Handler = async function (req, res, next) {
    const { email, password } = req.body;

    try {
        const query = { email };
        const user = await User.findOne(query);

        if (!user) return CustomError.throw(`We can't find account with ${email}`, 404);

        if (await user.isUnauthorized(password))
            return CustomError.throw(
                'The password you entered is incorrect, Please try again',
                404
            );

        // if (user.step !== 0) {
        //     return res.error({
        //         message: 'Please complete the signup process',
        //         step: user.step,
        //         email: user.email,
        //         userToken: jwt.sign({ userId: user._id }, process.env.JWT_SECRET),
        //     });
        // }

        const { accessToken, refreshToken } = await generateJWT(user);
        // user.removeSensitiveInfo();

        setTokenCookies(res, accessToken, refreshToken);

        res.success({
            user,
            accessToken,
            refreshToken,
        });
    } catch (e) {
        next(e);
    }
};

export { login };

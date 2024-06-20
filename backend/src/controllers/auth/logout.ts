// import { signAccessToken, signRefreshToken } from '../../utils/functions.js';
import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';
import { clearTokenCookies } from '../../utils/jwt/token.js';

const logout: Handler = async function (req, res, next) {
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId);

        if (!user) return CustomError.throw('This Account Does Not Exist', 404);

        user.refreshToken = '';
        await user.save();

        clearTokenCookies(res);
        res.success('logged out');
    } catch (e) {
        next(e);
    }
};

// async function checkEmail(req, res, next) {
//     const { email } = req.body;

//     try {
//         const query = { email };

//         const user = await User.findOne(query);

//         if (!user) Error.throw('This Account Does Not Exist', 404);

//         res.success({ backupEmail: user.backupEmail });
//     } catch (e) {
//         next(e);
//     }
// }

export default logout;

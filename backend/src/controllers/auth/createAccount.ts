import User from '../../models/User.js';
import { Handler } from 'express';
import { generateOTP } from '../../utils/functions.js';

const createAccount: Handler = async function (req, res, next) {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password,
        });

        const otp = generateOTP(4);

        user.otp.email = otp;

        await user.save();

        user.removeSensitiveInfo();

        res.success({
            message: 'user created',
            user,
        });
    } catch (e) {
        next(e);
    }
};

// const verifyEmail: Handler = async function (req, res, next) {
//     try {
//         const userId = req.user.id;

//         // const otp = req.body.otp;

//         const user = await User.findOne({ _id: userId, step: 1 });

//         if (!user) return Error.throw('user not found');
//         // if (user.otp.email === otp) user.verified.email = true;
//         else Error.throw('Verification code is invalid', 200);

//         // user.step = 0;

//         await user.save();

//         user.removeSensitiveInfo();

//         // const token = signToken(user);

//         res.success({
//             message: 'Your email address is successfully verified',
//             user,
//             // token,
//         });
//     } catch (e) {
//         next(e);
//     }
// };

export { createAccount };

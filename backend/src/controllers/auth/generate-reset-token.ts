import { Handler } from 'express';
import User from '../../models/User.js';
import { generateOTP } from '../../utils/functions.js';
import CustomError from '../../classes/CustomError.js';

const generateResetToken: Handler = async function (req, res, next) {
    const email = req.params.email;
    console.log(email);

    try {
        const user = await User.findOne({ backupEmail: email, role: 'user' });

        if (!user) return CustomError.throw('No account associated with this email!', 404);

        const otp = generateOTP(6);

        user.otp.email = otp;

        await user.save();

        res.success(
            `Your password reset request has been received and An email sent to your ${email}`
        );
    } catch (e) {
        next(e);
    }
};

export default generateResetToken;

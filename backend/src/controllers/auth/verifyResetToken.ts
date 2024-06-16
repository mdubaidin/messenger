import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';

const verifyResetToken: Handler = async function (req, res, next) {
    const otp = req.body.otp;

    try {
        const user = await User.findOne({ 'otp.email': otp });

        if (!user) return CustomError.throw('Your entered code is Invalid', 200);

        res.success('Your reset password code has been verified');
    } catch (e) {
        next(e);
    }
};

export default verifyResetToken;

import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';

const createPassword: Handler = async function (req, res, next) {
    const otp = req.body.otp;
    const password = req.body.password;

    try {
        const user = await User.findOne({ 'otp.email': otp });

        if (!user) return CustomError.throw('User not found');

        user.password = password;
        user.otp.email = '';

        await user.save();

        res.success(`Your password has been successfully reset.`);
    } catch (e) {
        next(e);
    }
};

export default createPassword;

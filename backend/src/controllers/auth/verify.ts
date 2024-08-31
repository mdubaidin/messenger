import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import OTP from '../../models/OTP.js';

const verify: Handler = async function (req, res, next) {
    try {
        const { email, otp } = req.body;

        if (!(email && otp)) throw new CustomError('Link is Invalid', 403);

        const isExists = await OTP.findOne({ email, otp });

        if (!isExists) throw new CustomError('Link is Invalid', 403);

        res.success('');
    } catch (e) {
        next(e);
    }
};

export default verify;

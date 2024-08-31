import { Handler } from 'express';
import User from '../../models/User.js';
import CustomError from '../../classes/CustomError.js';

const fetch: Handler = async function (req, res, next) {
    const userId = req.user?.id;

    try {
        if (!userId) throw new CustomError('Profile not found', 404);

        const profile = await User.findById(userId).select('-password -refreshToken -otp');

        res.success({ profile });
    } catch (err) {
        next(err);
    }
};

export default fetch;

import User from '../../schema/User.js';

export default async function (req, res, next) {
    const otp = req.body.otp;

    try {
        const user = await User.findOne({ 'otp.email': otp });

        if (!user) Error.throw('Your entered code is Invalid', 200);

        res.success('Your reset password code has been verified');
    } catch (e) {
        next(e);
    }
}

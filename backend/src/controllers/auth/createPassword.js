import User from '../../schema/User.js';

export default async function (req, res, next) {
    const otp = req.body.otp;
    const password = req.body.password;

    try {
        const user = await User.findOne({ 'otp.email': otp });
        console.log(user);

        if (!user) Error.throw('User not found');

        user.password = password;
        user.otp = undefined;

        await user.save();

        res.success(`Your password has been successfully reset.`);
    } catch (e) {
        next(e);
    }
}

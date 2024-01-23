import { signToken } from '../../utilities/functions.js';
import User from './../../models/User.js';

export default async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) Error.throw('email and password is invalid', 404);

        const token = signToken(user);

        res.success({ token });
    } catch (e) {
        next(e);
    }
}

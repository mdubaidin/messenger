import redis from '../../libs/redis.js';
import User from './../../models/User.js';

export default async function (req, res, next) {
    try {
        const { email } = req.params;

        console.log('fetching user');
        const user = await User.findOne({ email });

        if (user) await redis.set(user.email, user);

        res.success({ user });
    } catch (e) {
        next(e);
    }
}

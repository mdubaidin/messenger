import User from './../../models/User.js';
import { signToken } from '../../utilities/functions.js';

export default async function (req, res, next) {
    try {
        const { name, username, password, email } = req.body;

        const user = await User.create({
            name,
            username,
            password,
            email,
        });

        const token = signToken(user);

        res.success({ messege: 'New user SignUp successfull', token });
    } catch (e) {
        next(e);
    }
}

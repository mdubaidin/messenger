import Jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export default async function (req, res, next) {
    try {
        if (!typeof req.headers.authorization === 'string')
            Error.throw('Invalid token');

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return Error.throw('JWT must be provided', 401);

        const user = Jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;
        req.user.id = new Types.ObjectId(user.id);

        next();
    } catch (e) {
        console.log(e);
        res.status(401).error(e.message);
    }
}

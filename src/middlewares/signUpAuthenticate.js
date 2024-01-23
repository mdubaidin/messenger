import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

function signUpAuthenticate(req, res, next) {
    try {
        const { userToken } = req.body;

        if (!userToken) Error.throw('JWT must be provided', 401);

        const { userId } = jwt.verify(userToken, process.env.JWT_SECRET);

        req.userId = new Types.ObjectId(userId);

        next();
    } catch (e) {
        console.log(e);
        res.status(401).error(e.message);
    }
}

export default signUpAuthenticate;

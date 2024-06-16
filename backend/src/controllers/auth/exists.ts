import { Handler } from 'express';
import User from '../../models/User.js';

function exists(toFind: string): Handler {
    return async function (req, res, next) {
        try {
            const user = await User.findOne({
                [toFind]: req.body.value,
            });

            res.success({
                exists: Boolean(user),
            });
        } catch (e) {
            next(e);
        }
    };
}

export default exists;

import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Request from '../../models/Request.js';

const status: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const requestId = req.params.id;
        const status = req.body.status;

        if (!requestId) throw new CustomError('Request Id must be provided');

        const { acknowledged, matchedCount, modifiedCount } = await Request.updateOne(
            {
                _id: requestId,
                receiver: userId,
            },
            { status }
        );

        if (!acknowledged)
            throw new CustomError('Something went wrong while updating the request', 500);

        if (matchedCount === 0) throw new CustomError('Invalid request id');

        if (modifiedCount === 0) return res.success('Already updated!');

        res.success(`Status changed to ${status}!`);
    } catch (e) {
        next(e);
    }
};

export default status;

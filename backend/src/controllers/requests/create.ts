import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';
import Request from '../../models/Request.js';

const create: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const { receiver } = req.body;

        const newRequest = new Request({
            sender: userId,
            receiver,
            status: 'pending',
        });

        await newRequest.save();

        res.success({ message: 'Friend request sent!' });
    } catch (e) {
        next(e);
    }
};

export default create;

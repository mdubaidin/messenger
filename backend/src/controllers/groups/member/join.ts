import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Chat from '../../../models/Chat.js';
import Member from '../../../models/Member.js';

const join: Handler = async function (req, res, next) {
    try {
        const user = req.user?.id;
        const chat = req.params.id;

        if (!chat) throw new CustomError('Group Id must be provided');

        const group = await Chat.findOne({ chat, group: true });

        if (!group) throw new CustomError('No group found');

        await Member.create({ user: user, chat: chat });

        res.success({ message: 'New Member added' });
    } catch (e) {
        next(e);
    }
};

export default join;

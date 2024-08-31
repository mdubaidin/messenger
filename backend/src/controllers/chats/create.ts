import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';

const create: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const { contactId } = req.body;

        if (!contactId) throw new CustomError('ContactId must be specified');

        if (contactId === userId) throw new CustomError('You cannot send a message to yourself.');

        const isChatExists = await Chat.countDocuments({
            members: { $all: [userId, contactId] },
        });

        if (isChatExists) return res.success('chat already exists');

        const newChat = new Chat({
            members: [userId, contactId],
        });

        await newChat.save();

        res.success({ message: 'New chat created' });
    } catch (e) {
        next(e);
    }
};

export default create;

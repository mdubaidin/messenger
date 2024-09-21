import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';

const _delete: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const chatId = req.params.id;

        if (!chatId) throw new CustomError('Chat Id must be provided');

        const chat = await Chat.findById(chatId);

        if (!chat) throw new CustomError('No chat found');

        await chat.updateOne({ $pull: { members: userId } });

        if (chat.members?.length === 0) await chat.deleteOne();

        res.success({ message: 'Chat deleted' });
    } catch (e) {
        next(e);
    }
};

export default _delete;

import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';

const _delete: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const chatId = req.params.id;

        if (!chatId) throw new CustomError('Chat Id must be provided');

        const group = await Chat.findById(chatId);

        if (!group) throw new CustomError('No chat found');

        await group.updateOne({ $pull: { members: userId } });

        console.log(group);

        res.success({ message: 'Chat deleted' });
    } catch (e) {
        next(e);
    }
};

export default _delete;

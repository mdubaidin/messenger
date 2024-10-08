import { Handler } from 'express';
import Message from '../../models/Message.js';

const create: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const { chatId, content, attachment } = req.body;

        const newMessage = new Message({
            chatId,
            sender: userId,
            content,
            attachment,
        });

        await newMessage.save();

        res.success({ message: 'Message sent!' });
    } catch (e) {
        next(e);
    }
};

export default create;

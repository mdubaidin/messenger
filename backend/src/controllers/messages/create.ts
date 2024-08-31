import { Handler } from 'express';
import Message from '../../models/Message.js';

const create: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const { chatId, receiver, content, attachment } = req.body;

        const newMessage = new Message({
            chatId,
            sender: userId,
            receiver,
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

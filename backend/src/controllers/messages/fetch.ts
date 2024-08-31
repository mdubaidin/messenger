import { Handler } from 'express';
import DataSource from '../../classes/DataSource.js';
import Message from '../../models/Message.js';
import CustomError from '../../classes/CustomError.js';

const fetch: Handler = async function (req, res, next) {
    try {
        const chatId = req.params.id;

        if (!chatId) throw new CustomError('Chat id must be provided');

        const dataSource = new DataSource(Message, req.query);

        const messages = dataSource.find({ chatId });

        res.success({ messages, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export default fetch;

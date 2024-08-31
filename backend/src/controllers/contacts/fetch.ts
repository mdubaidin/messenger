import { Handler } from 'express';
import Chat from '../../models/Chat.js';
import DataSource from '../../classes/DataSource.js';
import Request from '../../models/Request.js';

const fetch: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;

        const dataSource = new DataSource(Request, req.query);

        const contacts = dataSource.aggregate([
            {
                $match: { $or: [{ receiver: userId }, { sender: userId }], status: 'accepted' },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'receiver',
                    foreignField: '_id',
                    as: 'contact',
                },
            },
        ]);

        res.success({ contacts, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export default fetch;

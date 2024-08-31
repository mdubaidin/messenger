import { Handler } from 'express';
import Chat from '../../models/Chat.js';
import DataSource from '../../classes/DataSource.js';
import Member from '../../models/Member.js';

const fetch: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;
        const chat = req.params.id;

        if (chat) {
            const group = await Chat.findById(chat);
            const members = await Member.find({ chat }, { user: 1, admin: 1 }).populate({
                path: 'user',
                select: 'username name',
            });

            return res.success({ group, members });
        }

        const dataSource = new DataSource(Member, req.query);

        const [groups] = await dataSource.aggregate([
            { $match: { user: userId } },
            {
                $lookup: {
                    from: 'chats',
                    localField: 'chat',
                    foreignField: '_id',
                    as: 'groups',
                },
            },
            {
                $unwind: {
                    path: '$groups',
                },
            },
            {
                $replaceRoot: {
                    newRoot: '$groups',
                },
            },
        ]);

        res.success({ groups, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export default fetch;

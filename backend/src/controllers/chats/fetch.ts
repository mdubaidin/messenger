import { Handler } from 'express';
import Chat from '../../models/Chat.js';
import DataSource from '../../classes/DataSource.js';

const fetch: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;
        const chatId = req.params.id;

        if (chatId) {
            const chat = await Chat.findOne({ _id: chatId, group: false }).populate(
                'members',
                'name username bio'
            );

            return res.success({ chat });
        }

        const dataSource = new DataSource(Chat, req.query);

        const chats = await dataSource.aggregate([
            {
                $match: { members: { $all: [userId] }, group: false },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'members',
                    foreignField: '_id',
                    as: 'members',
                    pipeline: [
                        {
                            $match: { _id: { $ne: userId } },
                        },
                        {
                            $project: { name: 1, picture: 1 },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: '$members',
                },
            },
            {
                $addFields: {
                    name: '$members.name',
                    picture: '$members.picture',
                    memberId: '$members._id',
                },
            },
            { $project: { members: 0 } },
            {
                $sort: { updatedAt: -1 },
            },
        ]);

        res.success({ chats, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

const fetchAll: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;

        const dataSource = new DataSource(Chat, req.query);

        const chats = await dataSource.aggregate([
            {
                $facet: {
                    chats: [
                        {
                            $match: {
                                group: false,
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'members',
                                foreignField: '_id',
                                as: 'members',
                                pipeline: [
                                    {
                                        $match: {
                                            _id: {
                                                $ne: userId,
                                            },
                                        },
                                    },
                                    {
                                        $project: {
                                            name: 1,
                                            picture: 1,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $unwind: {
                                path: '$members',
                            },
                        },
                        {
                            $addFields: {
                                name: '$members.name',
                                picture: '$members.picture',
                                memberId: '$members._id',
                            },
                        },
                        {
                            $project: {
                                members: 0,
                            },
                        },
                    ],
                    groups: [
                        {
                            $match: {
                                group: true,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    chats: {
                        $concatArrays: ['$chats', '$groups'],
                    },
                },
            },
            {
                $set: {
                    chats: {
                        $sortArray: {
                            input: '$chats',
                            sortBy: {
                                updatedAt: -1,
                            },
                        },
                    },
                },
            },
            {
                $unwind: {
                    path: '$chats',
                },
            },
            {
                $replaceRoot: {
                    newRoot: '$chats',
                },
            },
        ]);

        res.success({ chats, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export { fetch, fetchAll };

import { Handler } from 'express';
import Chat from '../../models/Chat.js';
import DataSource from '../../classes/DataSource.js';
import UserChat from '../../models/UserChat.js';
import { Types } from 'mongoose';

const fetch: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;
        const chatId = req.params.id;

        if (chatId) {
            const [data] = await UserChat.aggregate([
                {
                    $match: {
                        chat: new Types.ObjectId(chatId),
                        user: {
                            $ne: userId,
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    username: 1,
                                    picture: 1,
                                    bio: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'chats',
                        localField: 'chat',
                        foreignField: '_id',
                        as: 'chat',
                        pipeline: [
                            {
                                $project: {
                                    members: 0,
                                },
                            },
                        ],
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [
                                {
                                    $arrayElemAt: ['$chat', 0],
                                },
                                {
                                    $arrayElemAt: ['$user', 0],
                                },
                                '$$ROOT',
                            ],
                        },
                    },
                },
                {
                    $addFields: {
                        chat: {
                            $first: '$chat._id',
                        },
                        user: {
                            $first: '$user._id',
                        },
                    },
                },
            ]);

            return res.success({ data });
        }

        const dataSource = new DataSource(Chat, req.query);

        const data = await dataSource.aggregate([
            {
                $match: { members: { $all: [userId] } },
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
        ]);

        res.success({ data, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

const fetchAll: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;

        const dataSource = new DataSource(Chat, req.query);

        const data = await dataSource.aggregate([
            {
                $facet: {
                    chats: [
                        {
                            $match: {
                                members: {
                                    $all: [userId],
                                },
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
                                userId: '$members._id',
                            },
                        },
                        {
                            $project: {
                                members: 0,
                            },
                        },
                    ],
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
            {
                $unionWith: {
                    coll: 'usergroups',
                    pipeline: [
                        {
                            $match: {
                                user: userId,
                            },
                        },
                        {
                            $lookup: {
                                from: 'groups',
                                localField: 'group',
                                foreignField: '_id',
                                as: 'group',
                            },
                        },
                        {
                            $addFields: {
                                group: {
                                    $first: '$group',
                                },
                            },
                        },
                        {
                            $replaceRoot: {
                                newRoot: '$group',
                            },
                        },
                    ],
                },
            },
        ]);

        res.success({ data, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export { fetch, fetchAll };

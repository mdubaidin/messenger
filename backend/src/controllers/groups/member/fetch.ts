import { Handler } from 'express';
import DataSource from '../../../classes/DataSource.js';
import UserGroup from '../../../models/UserGroup.js';
import CustomError from '../../../classes/CustomError.js';
import { Types } from 'mongoose';

const fetch: Handler = async function (req, res, next) {
    try {
        const groupId = req.params.id;

        if (!groupId) throw new CustomError('Group ID must be provided');

        const dataSource = new DataSource(UserGroup, req.query);
        const data = await dataSource.aggregate([
            {
                $match: {
                    group: new Types.ObjectId(groupId),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'members',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                username: 1,
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
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$$ROOT', '$members'],
                    },
                },
            },
            {
                $project: {
                    members: 0,
                    createdAt: 0,
                    updatedAt: 0,
                },
            },
        ]);

        res.success({ data, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export default fetch;

import { Handler } from 'express';
import DataSource from '../../classes/DataSource.js';
import UserGroup from '../../models/UserGroup.js';
import Group from '../../models/Group.js';

const fetch: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;
        const groupId = req.params.id;

        if (groupId) {
            const group = await Group.findById(groupId);
            const members = await UserGroup.find({ group: groupId }, { user: 1, admin: 1 }, { limit: 5 }).populate({
                path: 'user',
                select: 'username bio name',
            });

            return res.success({ data: { group, members } });
        }

        const dataSource = new DataSource(UserGroup, req.query);

        const [data] = await dataSource.aggregate([
            { $match: { user: userId } },
            {
                $lookup: {
                    from: 'groups',
                    localField: 'group',
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

        res.success({ data, pageData: dataSource.pageData });
    } catch (e) {
        next(e);
    }
};

export default fetch;

import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Group from '../../../models/Group.js';
import UserGroup from '../../../models/UserGroup.js';

const join: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;
        const groupId = req.params.id;

        if (!groupId) throw new CustomError('Group Id must be provided');

        const group = await Group.findById(groupId);

        if (!group) throw new CustomError('No group found', 404);

        await UserGroup.create({ user: userId, group: groupId });

        res.success({ message: 'New Member added' });
    } catch (e) {
        next(e);
    }
};

export default join;

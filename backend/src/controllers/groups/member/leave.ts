import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Group from '../../../models/Group.js';
import UserGroup from '../../../models/UserGroup.js';

const leave: Handler = async function (req, res, next) {
    try {
        const userId = req.user?._id;
        const groupId = req.params.id;

        if (!groupId) throw new CustomError('Group Id must be provided');

        const group = await Group.findById(groupId);

        if (!group) throw new CustomError('No group found', 404);

        const adminCount = await UserGroup.countDocuments({ gruop: groupId, admin: true });

        if (adminCount && adminCount < 2)
            throw new CustomError('Before leaving the group you must have to assign a new admin');

        await UserGroup.deleteOne({ group: groupId, user: userId });

        await group.save();

        res.success({ message: `You left ${group.name} group` });
    } catch (e) {
        next(e);
    }
};

export default leave;

import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Group from '../../../models/Group.js';
import UserGroup from '../../../models/UserGroup.js';

const remove: Handler = async function (req, res, next) {
    try {
        const groupId = req.group._id;
        const memberId = req.params.id;

        if (!memberId) throw new CustomError('Member Id must be provided');

        const group = await Group.findById(groupId);

        if (!group) throw new CustomError('No group found', 404);

        await UserGroup.deleteOne({ group: groupId, user: memberId });

        res.success({ message: `A member has been removed from ${group.name} group by admin` });
    } catch (e) {
        next(e);
    }
};

export default remove;

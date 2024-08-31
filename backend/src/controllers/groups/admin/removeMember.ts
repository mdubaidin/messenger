import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Chat from '../../../models/Chat.js';
import Member from '../../../models/Member.js';

const remove: Handler = async function (req, res, next) {
    try {
        const groupId = req.group._id;
        const memberId = req.params.id;

        if (!memberId) throw new CustomError('Member Id must be provided');

        const group = await Chat.findOne({ _id: groupId, group: true });

        if (!group) throw new CustomError('No group found');

        await Member.deleteOne({ chat: groupId, user: memberId });

        res.success({ message: `A member has been removed from ${group.name} group by admin` });
    } catch (e) {
        next(e);
    }
};

export default remove;

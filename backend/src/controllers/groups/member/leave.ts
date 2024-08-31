import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Chat from '../../../models/Chat.js';
import Member from '../../../models/Member.js';

const leave: Handler = async function (req, res, next) {
    try {
        const userId = req.user?.id;
        const groupId = req.params.id;

        if (!groupId) throw new CustomError('Group Id must be provided');

        const group = await Chat.findOne({ _id: groupId, group: true });

        if (!group) throw new CustomError('No group found');

        const adminCount = await Member.countDocuments({ chat: groupId, admin: true });

        if (adminCount && adminCount < 2)
            throw new CustomError('Before leaving the group you must have to assign a new admin');

        await Member.deleteOne({ chat: groupId, user: userId });

        await group.save();

        res.success({ message: `You left ${group.name} group` });
    } catch (e) {
        next(e);
    }
};

export default leave;

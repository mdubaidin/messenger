import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Chat from '../../../models/Chat.js';
import Member from '../../../models/Member.js';

const removeAdmin: Handler = async function (req, res, next) {
    try {
        const groupId = req.group._id;
        const memberId = req.params.id;

        if (!memberId) throw new CustomError('Member Id must be provided');

        const group = await Chat.findOne({ _id: groupId, group: true });

        if (!group) throw new CustomError('No group found');

        const member = Member.findOne({ chat: groupId, user: memberId });

        if (!member) throw new CustomError(`Member is not in ${group.name} group`);

        await member.updateOne({ admin: false });

        res.success({ message: 'admin removed' });
    } catch (e) {
        next(e);
    }
};

export default removeAdmin;

import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import Chat from '../../../models/Chat.js';
import Member from '../../../models/Member.js';
import mongoose from 'mongoose';

const _delete: Handler = async function (req, res, next) {
    let session = null;
    try {
        const chatId = req.params.id;

        if (!chatId) throw new CustomError('Group Id must be provided');

        const group = await Chat.findOne({ _id: chatId, group: true });

        if (!group) throw new CustomError('No group found');

        session = await mongoose.startSession();
        session.startTransaction();

        await Member.deleteMany({ chat: chatId }, { session });

        await group.deleteOne({ session });

        await session.commitTransaction();

        res.success({ message: `${group.name} group deleted` });
    } catch (e) {
        next(e);
        session?.abortTransaction();
    } finally {
        session?.endSession();
    }
};

export default _delete;

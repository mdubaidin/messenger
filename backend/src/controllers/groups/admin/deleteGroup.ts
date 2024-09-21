import { Handler } from 'express';
import CustomError from '../../../classes/CustomError.js';
import mongoose from 'mongoose';
import Group from '../../../models/Group.js';
import UserGroup from '../../../models/UserGroup.js';

const _delete: Handler = async function (req, res, next) {
    let session = null;
    try {
        const groupId = req.params.id;

        if (!groupId) throw new CustomError('Group Id must be provided');

        const group = await Group.findById(groupId);

        if (!group) throw new CustomError('No group found', 404);

        session = await mongoose.startSession();
        session.startTransaction();

        await UserGroup.deleteMany({ group: groupId }, { session });

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

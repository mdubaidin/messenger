import { Handler } from 'express';
import CustomError from '../classes/CustomError.js';
import Member from '../models/Member.js';
import { Types } from 'mongoose';

const isAdmin: Handler = async function (req, res, next) {
    const userId = req.user?.id;
    const groupId = req.params.groupId;

    if (!groupId) throw new CustomError('Group Id must be provided');

    const isAdmin = await Member.countDocuments({ chat: groupId, user: userId, admin: true });

    req.group = { _id: new Types.ObjectId(groupId), isAdmin: Boolean(isAdmin) };

    if (isAdmin) return next();

    throw new CustomError('Only admins are allowed to perform this operation');
};

export default isAdmin;

import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import { base64EncodeUrl } from '../../utils/functions.js';
import mongoose, { Types } from 'mongoose';
import UserGroup, { UserGroupInput } from '../../models/UserGroup.js';
import FileSystem from '../../classes/FileSystem.js';
import { emitEvent } from '../../events/emitter.js';
import Group from '../../models/Group.js';

const create: Handler = async function (req, res, next) {
    let session = null;
    const fs = new FileSystem();
    let filename: string | undefined;

    try {
        const userId = req.user?._id;
        const { name, members } = req.body;

        if (!name) throw new CustomError('Group name must be provided');

        const filterMembers: string[] = Array.from(new Set(members));

        if (members.length !== filterMembers.length)
            throw new CustomError('Duplicate members found');

        if (filterMembers.length < 2) throw new CustomError('At least 2 members must be provided');

        const file = req.file;
        const picture = file ? base64EncodeUrl(file) : '';
        filename = file?.filename;

        session = await mongoose.startSession();
        session.startTransaction();

        const newGroup = new Group({
            name,
            picture,
            creator: userId,
        });

        const memberToInsert: UserGroupInput[] = [
            { user: userId, group: newGroup.id, admin: true },
        ];

        filterMembers.forEach(member => {
            memberToInsert.push({ user: new Types.ObjectId(member), group: newGroup.id });
        });

        await UserGroup.insertMany(memberToInsert, { session });

        await newGroup.save({ session });

        await session.commitTransaction();

        emitEvent('Alert');

        res.success({ message: 'New group created', group: newGroup });
    } catch (e) {
        next(e);
        await session?.abortTransaction();
    } finally {
        session?.endSession();

        if (filename) fs.deleteFile(filename);
    }
};

export default create;

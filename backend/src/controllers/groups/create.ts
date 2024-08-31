import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';
import { base64EncodeUrl } from '../../utils/functions.js';
import mongoose, { Types } from 'mongoose';
import Member, { MemberObject } from '../../models/Member.js';
import FileSystem from '../../classes/FileSystem.js';

const create: Handler = async function (req, res, next) {
    let session = null;
    const fs = new FileSystem();
    let filename = '';

    try {
        const userId = req.user?._id;
        const { name, members } = req.body;

        if (!name) throw new CustomError('Group name must be provided');

        const picture = req.file;

        if (!picture) throw new CustomError('Group Icon must be provided');

        filename = picture.filename;

        console.log(picture);

        const filterMembers: string[] = Array.from(new Set(members));

        if (members.length !== filterMembers.length)
            throw new CustomError('Duplicate members found');

        if (filterMembers.length < 2) throw new CustomError('At least 2 members must be provided');

        session = await mongoose.startSession();
        session.startTransaction();

        const newChat = new Chat({
            name,
            group: true,
            picture: base64EncodeUrl(picture),
        });

        const memberToInsert: MemberObject[] = [{ user: userId, chat: newChat.id, admin: true }];

        filterMembers.forEach(member => {
            memberToInsert.push({ user: new Types.ObjectId(member), chat: newChat.id });
        });

        await Member.insertMany(memberToInsert, { session });

        await newChat.save({ session });

        await session.commitTransaction();

        res.success({ message: 'New group created', group: newChat });
    } catch (e) {
        next(e);
        await session?.abortTransaction();
    } finally {
        session?.endSession();

        if (filename != null) fs.deleteFile(filename);
    }
};

export default create;

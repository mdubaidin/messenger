import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';
import UserChat, { UserChatInput } from '../../models/UserChat.js';
import mongoose from 'mongoose';

const create: Handler = async function (req, res, next) {
    let session = null;

    try {
        const userId = req.user?._id;
        const { contactId } = req.body;

        if (!contactId) throw new CustomError('ContactId must be specified');

        if (contactId === userId) throw new CustomError('You cannot send a message to yourself.');

        const isChatExists = await Chat.countDocuments({
            members: { $all: [userId, contactId] },
        });

        if (isChatExists) return res.success('chat already exists');

        session = await mongoose.startSession();
        session.startTransaction();

        const newChat = new Chat({
            members: [userId, contactId],
        });

        const memberToInsert: UserChatInput[] = [
            { user: userId, chat: newChat.id },
            { user: contactId, chat: newChat.id },
        ];

        await UserChat.insertMany(memberToInsert, { session });

        await newChat.save({ session });

        await session.commitTransaction();

        res.success({ message: 'New chat created' });
    } catch (e) {
        next(e);
        await session?.abortTransaction();
    } finally {
        session?.endSession();
    }
};

export default create;

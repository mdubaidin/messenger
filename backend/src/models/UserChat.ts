import { Schema, Types, model } from 'mongoose';

const required = true;

export interface UserChatInput {
    user: Types.ObjectId;
    chat: Types.ObjectId;
}

export interface UserChatDocument extends UserChatInput, Document {}

const userChatSchema = new Schema(
    {
        chat: { type: Types.ObjectId, ref: 'Chat', required },
        user: { type: Types.ObjectId, ref: 'User', required },
    },
    { timestamps: true }
);

export default model<UserChatDocument>('userchat', userChatSchema);

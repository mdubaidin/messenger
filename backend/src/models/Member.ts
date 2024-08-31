import { Schema, Types, model } from 'mongoose';

const required = true;

export interface MemberObject {
    user: Types.ObjectId;
    chat: Types.ObjectId;
    admin?: boolean;
}

export interface MemberDocument extends MemberObject, Document {}

const memberSchema = new Schema(
    {
        chat: { type: Types.ObjectId, ref: 'Chat', required },
        user: { type: Types.ObjectId, ref: 'User', required },
        admin: { type: Boolean },
    },
    { timestamps: true }
);

export default model<MemberDocument>('member', memberSchema);

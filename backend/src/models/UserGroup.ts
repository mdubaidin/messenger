import { Schema, Types, model } from 'mongoose';

const required = true;

export interface UserGroupInput {
    user: Types.ObjectId;
    group: Types.ObjectId;
    admin?: Boolean;
}

export interface UserGroupDocument extends UserGroupInput, Document {}

const groupChatSchema = new Schema(
    {
        group: { type: Types.ObjectId, ref: 'Group', required },
        user: { type: Types.ObjectId, ref: 'User', required },
        admin: { type: Boolean },
    },
    { timestamps: true }
);

export default model<UserGroupDocument>('usergroup', groupChatSchema);

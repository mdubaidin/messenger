import { Schema, Types, model } from 'mongoose';

const required = true;

export interface GroupInput {
    name: string;
    picture?: string;
    creator: Types.ObjectId;
    description?: string;
}

export interface GroupDocument extends GroupInput, Document {}

const groupSchema = new Schema(
    {
        name: { type: String, required },
        creator: { type: Types.ObjectId, required, ref: 'User' },
        picture: String,
        description: { type: String, maxlength: 100 },
    },
    { timestamps: true }
);

export default model<GroupDocument>('group', groupSchema);

import { Schema, Types, model } from 'mongoose';

const required = true;

const statusValues = ['pending', 'accepted', 'declined'] as const;

type Status = (typeof statusValues)[number];

export interface RequestInput {
    status: Status;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
}

export interface RequestDocument extends RequestInput, Document {}

const requestSchema = new Schema(
    {
        status: { type: String, default: 'pending', enum: statusValues },
        sender: { type: Types.ObjectId, ref: 'User', required },
        receiver: { type: Types.ObjectId, ref: 'User', required },
    },
    { timestamps: true }
);

export default model<RequestDocument>('request', requestSchema);

import { Schema, Types, model } from 'mongoose';

const required = true;

export interface ChatInput {
    members: Types.ObjectId[];
}

export interface ChatDocument extends ChatInput, Document {}

const chatSchema = new Schema(
    {
        members: {
            type: [Types.ObjectId],
            ref: 'User',
            validate: {
                validator: function (this: ChatDocument, v: string) {
                    return v !== null && v.length > 0;
                },
                message: `field 'Members' is required`,
            },
        },
    },
    { timestamps: true }
);

export default model<ChatDocument>('chat', chatSchema);

import { Schema, Types, model } from 'mongoose';

const required = true;

export interface ChatInput {
    name: string;
    group: boolean;
    picture?: string;
    members?: Types.ObjectId[];
}

export interface ChatDocument extends ChatInput, Document {}

const chatSchema = new Schema(
    {
        name: {
            type: String,
            required: function (this: ChatDocument) {
                return this.group;
            },
        },
        group: { type: Boolean, default: false },
        picture: {
            type: String,
            required: function (this: ChatDocument) {
                return this.group;
            },
        },
        members: {
            type: [Types.ObjectId],
            ref: 'User',
            default: undefined,
            validate: {
                validator: function (this: ChatDocument, v: string) {
                    return this.group || (v !== null && v.length > 0);
                },
                message: `field 'Members' is required`,
            },
        },
    },
    { timestamps: true }
);

export default model<ChatDocument>('chat', chatSchema);

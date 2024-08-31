import { Schema, Types, model } from 'mongoose';

const required = true;

export interface MessageInput {
    sender: Types.ObjectId;
    content: string;
    edited: boolean;
    attachment: string;
}

export interface MessageDocument extends MessageInput, Document {}

const messageSchema = new Schema(
    {
        chatId: { type: Types.ObjectId, ref: 'Chat', required },
        sender: { type: Types.ObjectId, ref: 'User', required },
        edited: { type: Boolean, default: false },
        content: {
            type: String,
            trim: true,
            required: function () {
                return !this.attachment;
            },
        },
        attachment: {
            type: String,
            trim: true,
            required: function () {
                return !this.content;
            },
        },
    },
    { timestamps: true }
);

export default model<MessageDocument>('messege', messageSchema);

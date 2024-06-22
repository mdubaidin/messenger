import { Schema, model } from 'mongoose';
import { emailValidator } from '../utils/validators.js';

const required = true;

const type = ['email-confirmation', 'password-reset'] as const;

type Type = (typeof type)[number];

export interface OTPInput {
    email: string;
    otp: string;
    type: Type;
    createdAt: Date;
}

export interface OTPDocument extends OTPInput, Document {}

const OTPschema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        validate: {
            validator: emailValidator,
            message: props => `${props.value} is not a valid email address!`,
        },
        required,
    },
    otp: { type: String, trim: true, required },
    type: { type: String, trim: true, enum: type, required },
    createdAt: { type: Date, expires: '10m', default: Date.now },
});

export default model<OTPDocument>('OTP', OTPschema);

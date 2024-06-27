import { CallbackWithoutResultAndOptionalError, Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { emailValidator } from '../utils/validators.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';

const PRIVATE_KEY = fs.readFileSync('./certs/private.pem', 'utf8');

export interface JwtUser extends JwtPayload {
    id: string;
}

export interface UserInput {
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
    provider: 'Google' | 'Facebook';
    providerId: string;
    picture: string;
    refreshToken: string;
}

interface Methods {
    isAuthorized(password: string): Promise<string>;
    isUnauthorized(password: string): Promise<boolean>;
    convertPasswordToHash(password: string): string;
    removeSensitiveInfo(): object;
    signAccessToken(): string;
    signRefreshToken(): string;
    createdAt: Date;
    updatedAt: Date;
}

const providers = ['Google', 'Facebook'];

export interface UserDocument extends UserInput, Document, Methods {}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: emailValidator,
                message: props => `${props.value} is not a valid email address!`,
            },
        },
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 40,
            required: true,
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
        },
        provider: {
            type: String,
            enum: providers,
        },
        providerId: {
            type: String,
            sparse: true,
            required: function (this: UserDocument) {
                return providers.includes(this.provider);
            },
        },
        picture: String,
        refreshToken: String,
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        dob: {
            type: Date,
        },
        otp: {
            email: {
                type: String,
            },
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const convertPasswordToHash = async function (
    this: UserDocument,
    next: CallbackWithoutResultAndOptionalError
) {
    if (this.isModified('password')) {
        this.password = await this.convertPasswordToHash(this.password);
    }
    next();
};

userSchema.pre(['save'], convertPasswordToHash);

userSchema.methods = {
    isAuthorized: async function (password: string) {
        return bcrypt.compare(password, this.password);
    },
    isUnauthorized: async function (password: string) {
        const authorized = await this.isAuthorized(password);
        return Boolean(!authorized);
    },
    convertPasswordToHash: async function (password: string) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    },
    removeSensitiveInfo: function () {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    },

    signAccessToken: function () {
        return jwt.sign({ id: this._id } as JwtUser, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: process.env.EXPIRE_JWT_ACCESS_TOKEN,
        });
    },

    signRefreshToken: function () {
        const REFRESH_SECRET = process.env.JWT_SECRET;
        if (!REFRESH_SECRET) throw new Error('REFRESH_SECRET is undefined');

        return jwt.sign({ id: this._id } as JwtUser, REFRESH_SECRET, {
            expiresIn: process.env.EXPIRE_JWT_REFRESH_TOKEN,
        });
    },
};

export default model<UserDocument>('User', userSchema);

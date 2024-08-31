import { CallbackWithoutResultAndOptionalError, Document, model, Schema, Types } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import { emailValidator, usernameValidator } from '../utils/validators.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';

const PRIVATE_KEY = fs.readFileSync('./certs/private.pem', 'utf8');

export interface JwtUser extends JwtPayload {
    id: string | Types.ObjectId;
}

const providers = ['google', 'facebook'] as const;
type Providers = (typeof providers)[number];

export interface UserInput {
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
    bio: string;
    provider: Providers;
    providerId: string;
    picture: string;
    refreshToken: string;
}

interface Methods {
    isAuthorized(password: string): Promise<string>;
    isUnauthorized(password: string): Promise<boolean>;
    hash(password: string): string;
    removeSensitiveInfo(): object;
    signAccessToken(): string;
    signRefreshToken(): string;
    createdAt: Date;
    updatedAt: Date;
}

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
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            minlength: 3,
            maxlength: 30,
            validate: {
                validator: usernameValidator,
                message: () =>
                    `A username can only contain letters, numbers, periods, and underscores.`,
            },
        },
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 40,
            required: true,
        },
        bio: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 100,
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

const hashPassword = async function (
    this: UserDocument,
    next: CallbackWithoutResultAndOptionalError
) {
    if (this.isModified('password')) {
        this.password = this.hash(this.password);
    }
    next();
};

userSchema.pre(['save'], hashPassword);

userSchema.methods = {
    isAuthorized: async function (password: string) {
        return compareSync(password, this.password);
    },

    hash: async function (password: string) {
        return hashSync(password, 10);
    },
    isUnauthorized: async function (password: string) {
        const authorized = await this.isAuthorized(password);
        return Boolean(!authorized);
    },

    removeSensitiveInfo: function () {
        var obj = this.toObject();
        delete obj.password;
        delete obj.otp;
        return obj;
    },

    signAccessToken: function () {
        return jwt.sign({ id: this._id } as JwtUser, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: process.env.EXPIRE_JWT_ACCESS_TOKEN,
        });
    },

    signRefreshToken: function () {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');

        return jwt.sign({ id: this._id } as JwtUser, JWT_SECRET, {
            expiresIn: process.env.EXPIRE_JWT_REFRESH_TOKEN,
        });
    },
};

export default model<UserDocument>('User', userSchema);

import { CallbackWithoutResultAndOptionalError, Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { emailValidator } from '../utils/validators';

export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
    otp: {
        email: string;
    };
}

interface Methods {
    isAuthorized(password: string): Promise<string>;
    isUnauthorized(password: string): Promise<boolean>;
    convertPasswordToHash(password: string): string;
    removeSensitiveInfo(): void;
    name?: string;
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
        firstName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 40,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 40,
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
        },
        // phone: {
        //     type: String,
        //     sparse: true,
        //     // validate: {
        //     //     validator: function (v) {
        //     //         return phoneValidator;
        //     //     },
        //     //     message: props => `${props.value} is not a valid number.`,
        //     // }, bugfix
        // },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true,
        },
        dob: {
            type: Date,
            required: true,
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
        this.password = undefined;
        this.otp = undefined;
    },
};

userSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName;
});

export default model<UserDocument>('User', userSchema);

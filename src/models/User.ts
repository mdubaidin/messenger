import { model, Schema } from 'mongoose';
import { emailValidator } from '@/src/utils/validators';

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please provide a username'],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: emailValidator,
            message: props => props.value + ' is not a valid email address',
        },
    },
    password: { type: String, required: [true, 'Please provide a strong password'], trim: true },
    role: { type: String, default: 'user' },
    isVerified: { type: Boolean, default: false },
});

export default model('user', userSchema);

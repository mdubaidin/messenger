import { ClassValue, clsx } from 'clsx';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface User {
    _id: Types.ObjectId;
    role: string;
}

const cn = (...inputs: ClassValue[]) => clsx(inputs);

// function filterObject(obj: object, values: string[]) {
//     const k: object = {};
//     values.forEach(key => {
//         if (obj.hasOwnProperty(key)) k[key] = obj[key];
//     });
//     return k;
// }

function generateRandomString(length: number) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var otp = '';

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
    }

    return otp;
}

const signToken = (user: User) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!);

const isEmptyObject = (obj: object) => {
    const ans = Object.keys(obj).length === 0;

    console.log(Object.keys(obj));

    return ans;
};

// function isValidMongoId(id) {
//     try {
//         if (!id) return false;
//         new Types.ObjectId(id);
//         return true;
//     } catch (e) {
//         return false;
//     }
// }

const isDefined = (v: string | number | object) => typeof v !== 'undefined' && v !== null;

export { signToken, generateRandomString, isEmptyObject, isDefined, cn };
export type { User };

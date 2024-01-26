import { ClassValue, clsx } from 'clsx';
import * as jose from 'jose';
import { Types } from 'mongoose';

interface UserCredential {
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

const signToken = async (user: UserCredential) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return await new jose.SignJWT({ id: user._id, role: user.role }).sign(secret);
};

const verifyToken = async (token: string) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return await jose.jwtVerify(token, secret);
};

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

export { signToken, generateRandomString, isEmptyObject, isDefined, cn, verifyToken };
export type { UserCredential };

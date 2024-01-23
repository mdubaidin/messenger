import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

function filterObject(obj, values) {
    const k = {};
    values.forEach(key => {
        if (obj.hasOwnProperty(key)) k[key] = obj[key];
    });
    return k;
}

function generateRandomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var otp = '';

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
    }

    return otp;
}

const signToken = user => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

const parseIp = req =>
    req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

const isEmptyObject = obj => {
    const ans = Object.keys(obj).length === 0;

    console.log(Object.keys(obj));

    return ans;
};

function isValidMongoId(id) {
    try {
        if (!id) return false;
        new Types.ObjectId(id);
        return true;
    } catch (e) {
        return false;
    }
}

const isDefined = v => typeof v !== 'undefined' && v !== null;

export {
    filterObject,
    signToken,
    generateRandomString,
    parseIp,
    isEmptyObject,
    isValidMongoId,
    isDefined,
};

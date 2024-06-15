// import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/User.js';

type K = {
    [key: string]: string | number | boolean;
};

function filterObject(obj: object, values: string[]) {
    const k: K = {};
    values.forEach(key => {
        const field = key as keyof typeof obj;
        if (obj.hasOwnProperty(key)) k[key] = obj[field];
    });
    return k;
}

function generateOTP(length: number) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var otp = '';

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
    }

    return otp;
}

const PRIVATE_KEY = fs.readFileSync('./certs/private.pem', 'utf8');

const signToken = (user: UserDocument) =>
    jwt.sign({ sub: user._id }, PRIVATE_KEY, { algorithm: 'RS256' });

const acceptFiles = function (...fileNames: string[]) {
    const tempStoragePath = 'temp_uploads';
    const actualStoragePath = 'uploads';

    fileNames.forEach(fileName => {
        const source = path.join(tempStoragePath, fileName);
        const destination = path.join(actualStoragePath, fileName);
        fs.renameSync(source, destination);
    });
};

const rejectFiles = function (...fileNames: string[]) {
    const folderPath = 'temp_uploads';

    fileNames.forEach(fileName => {
        if (!fileName) return;

        const fullPath = path.join(folderPath, fileName);
        return fs.unlinkSync(fullPath);
    });
};

function isValidMongoId(id: string) {
    try {
        if (!id) return false;
        new Types.ObjectId(id);
        return true;
    } catch (e) {
        return false;
    }
}

export { filterObject, generateOTP, acceptFiles, rejectFiles, isValidMongoId, signToken };

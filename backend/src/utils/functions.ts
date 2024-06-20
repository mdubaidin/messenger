// import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';

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

interface OTPoptions {
    digits?: boolean;
    alphabets?: boolean;
    upperCase?: boolean;
    specialChars?: boolean;
}
type keysOfProps = keyof OTPoptions;

function generateOTP(length: number, options?: OTPoptions) {
    var chars = '';

    if (options) {
        const keys: keysOfProps[] = Object.keys(options) as keysOfProps[];
        keys.forEach(key => {
            if (options[key] === true) {
                switch (key) {
                    case 'digits':
                        chars += '0123456789';
                        break;
                    case 'alphabets':
                        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                        break;
                    case 'upperCase':
                        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        break;
                    case 'specialChars':
                        chars += '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
                        break;
                    default:
                        chars += '0123456789';
                        break;
                }
            }
        });
    } else {
        chars = '0123456789';
    }

    var otp = '';

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
    }

    return otp;
}

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

function generateTemplate(template: string, data: any) {
    if (!template) throw new Error('Template must be provided');

    data.server = process.env.SERVER_URL as string;

    const keys = Object.keys(data);
    keys.forEach(key => {
        const regex = new RegExp(`{{${[key]}}}`, 'gi');
        template = template.replace(regex, data[key as keyof typeof data]);
    });

    return template;
}

export { filterObject, generateOTP, acceptFiles, rejectFiles, isValidMongoId, generateTemplate };

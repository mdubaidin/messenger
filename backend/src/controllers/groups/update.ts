import { Handler } from 'express';
import CustomError from '../../classes/CustomError.js';
import Chat from '../../models/Chat.js';
import { base64EncodeUrl } from '../../utils/functions.js';
import FileSystem from '../../classes/FileSystem.js';

const update: Handler = async function (req, res, next) {
    const fs = new FileSystem();
    let filename: string | undefined;

    try {
        const groupId = req.params.id;
        const { name } = req.body;

        const file = req.file;
        const picture = file ? base64EncodeUrl(file) : '';
        filename = file?.filename;

        const { acknowledged, matchedCount } = await Chat.updateOne({ _id: groupId, group: true }, { name, picture }, { runValidators: true });

        if (!acknowledged) throw new CustomError('Something went wrong, cannot update user', 500);

        if (matchedCount === 0) throw new CustomError('Not found', 404);

        res.success('');
    } catch (e) {
        next(e);
    } finally {
        if (filename) fs.deleteFile(filename);
    }
};

export default update;

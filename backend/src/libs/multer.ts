import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';

const upload = multer({
    storage: multer.diskStorage({
        destination: './temp_uploads',
        filename: (req, file, cb) => {
            const id = new mongoose.Types.ObjectId();
            const uniqueSuffix = id.toString();
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },
    }),
});

export default upload;

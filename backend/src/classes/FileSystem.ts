import fs, { WriteFileOptions } from 'fs';
import path from 'path';
import CustomError from './CustomError.js';
import { Response } from 'express';

class FileSystem {
    location = './uploads';

    constructor(location?: string) {
        if (location) {
            fs.mkdirSync(location);
            this.location = location;
        }

        if (!fs.existsSync(this.location)) fs.mkdirSync(this.location);
    }

    // Helper method to get the full path
    getFullPath(filePath: string) {
        console.log(filePath);
        return path.resolve(this.location, filePath);
    }

    uploadFile(...filePaths: string[]) {
        const files = filePaths.flat(Infinity);

        files.forEach(file => {
            const filePath = this.getFullPath(file);

            if (fs.existsSync(filePath))
                throw new CustomError(filePath + ' already exists { FileSystem }', 409);

            try {
                fs.writeFileSync(filePath, file);
                console.log(`File uploaded: ${filePath}`);
            } catch (e) {
                console.log(e);
                throw new CustomError(`Unable to upload the file at ${filePath}`, 500);
            }
        });
    }

    download(file: string, res: Response) {
        const filePath = path.join(this.location, file);

        if (!fs.existsSync(filePath))
            throw new CustomError(
                filePath + `Unable to find the file you're requesting. { FileSystem }`,
                404
            );

        try {
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        } catch (e) {
            console.log(e);
            throw new CustomError(`Something went wrong when downloading the file`, 500);
        }
    }

    deleteFile(...filePaths: string[]) {
        const files = filePaths.flat(Infinity);

        files.forEach(file => {
            const filePath = this.getFullPath(file);

            if (!fs.existsSync(filePath))
                throw new CustomError(filePath + ' no such file found { FileSystem }');

            try {
                fs.unlinkSync(filePath);
                console.log(`File deleted: ${filePath}`);
            } catch (e) {
                console.log(e);
                throw new CustomError(`Unable to delete the file at ${filePath}`, 500);
            }
        });
    }

    createReadStream(filePath: string) {
        const fullPath = this.getFullPath(filePath);
        return fs.createReadStream(fullPath);
    }

    createWriteStream(filePath: string) {
        const fullPath = this.getFullPath(filePath);
        return fs.createWriteStream(fullPath);
    }

    readFile(filePath: string, encoding: WriteFileOptions = 'utf8') {
        const fullPath = this.getFullPath(filePath);
        return fs.readFileSync(fullPath, encoding);
    }

    writeFile(filePath: string, data: any, encoding: WriteFileOptions = 'utf8') {
        const fullPath = this.getFullPath(filePath);
        fs.writeFileSync(fullPath, data, encoding);
        return fullPath;
    }

    makeDir(dirPath: string) {
        const fullPath = this.getFullPath(dirPath);
        fs.mkdirSync(fullPath, { recursive: true });
        return fullPath;
    }

    // Method to delete a directory
    deleteDir(dirPath: string) {
        const fullPath = this.getFullPath(dirPath);
        fs.rmdirSync(fullPath, { recursive: true });
        return `${dirPath} deleted.`;
    }

    fileExists(filePath: string) {
        const fullPath = this.getFullPath(filePath);
        return fs.existsSync(fullPath);
    }

    getFileStats(filePath: string) {
        const fullPath = this.getFullPath(filePath);
        return fs.statSync(fullPath);
    }
}

export default FileSystem;

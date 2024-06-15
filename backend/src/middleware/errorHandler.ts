import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import CustomError from '../classes/CustomError.js';

// bug fix handle mongoose server error

interface ServerError {
    [key: number]: { code: number; message: string };
}

export default function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log('Handling Error...');
    console.log(err);

    // if (err.name === 'Error') return res.error(err.message);

    // Any Error thrown by Error.throw()
    if (err instanceof CustomError) {
        return res.status(err.code).error({ errors: [err.message] });
    }

    // Any Mongoose Error
    if (err instanceof MongooseError) {
        return handleMongooseError(err, req, res);
    }

    // Mongoose Server Error
    if (err.name === 'MongoServerError') {
        console.log('MongoServerError');
        const error = serverErrors[err.code as keyof typeof serverErrors];
        error.message += Object.keys(err.keyValue).pop();
        return res.status(error.code).error({
            errors: [error.message],
        });
    }

    // if (err.type === 'StripeInvalidRequestError') {
    //     console.log('StripeInvalidRequestError');
    //     return res.status(err.statusCode).error({
    //         message: err.message,
    //     });
    // }

    // If no error is matched then say 500
    return error500(res);
}

function error500(res: Response) {
    return res.status(500).error('Something went wrong');
}

const serverErrors: ServerError = {
    11000: { code: 409, message: 'Duplicate entry for ' },
};

function handleMongooseError(err: MongooseError, req: Request, res: Response) {
    const { ValidationError } = MongooseError;

    if (err instanceof ValidationError) {
        const paths = Object.keys(err.errors);
        const errors = paths.map(path => {
            const { kind, message, name } = err.errors[path];

            switch (name) {
                case 'ValidatorError':
                    return message.replace('Path', 'Field');

                case 'CastError':
                    return `Field \`${path}\` should be of type \`${kind}\``;
            }
            // return { kind, message, path, name };
        });
        console.log(errors);
        return res.status(400).error({ errors });
    }

    return error500(res);
}

import { NextFunction, Request, Response } from 'express';
import CustomError from '../classes/CustomError.js';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log('Handling Error...');
    console.log(err);

    if (err.name === 'Error') return res.status(err?.code || 400).error({ errors: [err.message] });

    // Any Error thrown by CustomError
    if (err instanceof CustomError) {
        return res.status(err.statusCode).error({ errors: [err.message] });
    }

    // If no error is matched then say 500
    return error500(res);
}

function error500(res: Response) {
    return res.status(500).error('Something went wrong');
}

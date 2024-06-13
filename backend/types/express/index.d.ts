import { NextFunction } from 'express';

declare global {
    namespace Express {
        interface Response {
            success(res: object | string): Response;
            error(res: object | string): Response;
        }

        interface Request {
            user?: User;
        }

        type Handler = (req: Request, res: Response, next?: NextFunction) => void;
    }
}

export {};

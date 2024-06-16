import { NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JwtUser } from '../../src/models/User.ts';

declare global {
    namespace Express {
        interface Response {
            success(res: object | string): Response;
            error(res: object | string): Response;
        }

        interface Request {
            user?: JwtUser;
        }

        type Handler = (req: Request, res: Response, next?: NextFunction) => void;
    }
}

export {};

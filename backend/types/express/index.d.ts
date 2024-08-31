import { NextFunction } from 'express';
import { JwtUser } from '../../src/models/User.ts';
import { Types } from 'mongoose';

declare global {
    namespace Express {
        interface Response {
            success(res: object | string): Response;
            error(res: object | string): Response;
        }

        interface Request {
            user?: JwtUser;
            group: { _id: Types.ObjectId; isAdmin: Boolean };
        }

        namespace Multer {
            interface File {
                picture: string;
            }
        }

        type Handler = (req: Request, res: Response, next?: NextFunction) => void;
    }
}

export {};

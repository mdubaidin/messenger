import express from 'express';

declare global {
    namespace Express {
        export interface Response {
            success(res: object | string): Response;
            error(res: object | string): Response;
        }
    }
}

express.response.success = function (res: object | string) {
    if (typeof res === 'string')
        return this.json({
            success: true,
            message: res,
        });

    return this.json({
        success: true,
        ...res,
    });
};

express.response.error = function (res: object | string) {
    if (typeof res === 'string' || Array.isArray(res))
        return this.json({
            success: false,
            errors: Array.isArray(res) ? res : [res],
        });

    return this.json({
        success: false,
        ...res,
    });
};

declare global {
    interface ErrorConstructor {
        throw?(msg: string, code: number): void;
    }
    interface Error {
        code?: number;
    }
}

Error.throw = function (msg, code = 400) {
    const error = new Error(msg);
    error.code = code;
    error.name = 'CustomError';
    throw error;
};

// class CustomError extends Error {
//     code: number = 0;

//     constructor(message: string) {
//         super(message);
//         this.name = 'CustomError';
//         this.message = message;
//     }

//     public static throw(msg: string, code: number = 400) {
//         const error = new CustomError(msg);
//         error.code = code;
//         throw error;
//     }
// }

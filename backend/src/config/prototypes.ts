import express from 'express';

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

// Error.throw = function (msg, code = 400) {
//     const error = new Error(msg);
//     error.name = 'CustomError';
//     throw error;
// };

class CustomError extends Error {
    code: number = 0;

    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
        this.message = message;
    }

    public static throw(msg: string, code: number = 400) {
        const error = new CustomError(msg);
        error.code = code;
        throw error;
    }
}

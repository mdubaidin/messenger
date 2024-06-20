import { CookieOptions, Response } from 'express';

const setCookie = (res: Response, name: string, value: string, options?: CookieOptions) => {
    res.cookie(name, value, { secure: true, httpOnly: true, sameSite: 'strict', ...options });
};

const clearCookie = (res: Response, name: string, options?: CookieOptions) => {
    res.clearCookie(name, { secure: true, httpOnly: true, sameSite: 'strict', ...options });
};

export { setCookie, clearCookie };

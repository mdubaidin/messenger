import { jwtVerify } from 'jose';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { UserCredential, verifyToken } from './utils/function';
import * as crypto from 'crypto';

export async function middleware(request: NextRequest) {
    try {
        const token: string | undefined = request.cookies.get('accessToken')?.value;
        const path = request.nextUrl.pathname;

        if (path.startsWith('/auth') && Boolean(token))
            return NextResponse.redirect(new URL('/', request.nextUrl));

        if (!path.startsWith('/auth') && !token)
            return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));

        if (!token) throw new Error('Invalid token');

        const { payload, protectedHeader } = await verifyToken(token);

        console.log({ payload, protectedHeader });
    } catch (e) {
        console.log(e);
    }
}

export const config = {
    matcher: [
        '/',
        '/auth/signin',
        '/auth/signup',
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from './actions/auth';

const authPath = ['/auth/log-in', '/auth/create-account', '/auth/reset', '/auth/identify'];

export async function middleware(request: NextRequest) {
    const sessionCookie = await getSessionCookie();
    const { pathname } = request.nextUrl;
    console.log('Middleware');

    if (sessionCookie) {
        if (authPath.includes(pathname) || pathname === '/') {
            return NextResponse.redirect(new URL('/chats', request.nextUrl));
        } else {
            return NextResponse.next();
        }
    } else {
        if (!authPath.includes(pathname)) {
            return NextResponse.redirect(new URL('/auth/log-in', request.nextUrl));
        } else {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: ['/', '/auth/log-in', '/auth/create-account', '/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};

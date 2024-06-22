import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPath = ['/auth/log-in', '/auth/create-account', '/auth/reset', '/auth/identify'];

export function middleware(request: NextRequest) {
    const accessToken: string | undefined = cookies().get('access_token')?.value;
    const { pathname } = request.nextUrl;
    console.log('Middleware');

    if (accessToken) {
        if (authPath.includes(pathname) || pathname === '/') {
            return NextResponse.redirect(new URL('/c', request.nextUrl));
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

    // if (accessToken && authPath.includes(pathname)) {
    //     return NextResponse.redirect(new URL('/c', request.nextUrl));
    // }
}

export const config = {
    matcher: [
        '/',
        '/auth/log-in',
        '/auth/create-account',
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};

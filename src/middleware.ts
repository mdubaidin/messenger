import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPath = ['/auth/sign-in', '/auth/create'];

export function middleware(request: NextRequest) {
    const accessToken: string | undefined = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    if (!accessToken && !authPath.includes(pathname)) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl));
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/c', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/auth/sign-in',
        '/auth/create',
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};

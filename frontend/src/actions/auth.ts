'use server';

import { CookieUser } from '@/types/types';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSessionCookie() {
    return cookies().get('jwt-auth.access-token')?.value;
}

export async function getSessionCookieUser(): Promise<CookieUser | null> {
    const sessionCookie = await getSessionCookie();
    if (!sessionCookie) return null;
    return jwtDecode(sessionCookie);
}

export async function logout() {
    cookies().delete('jwt-auth.access-token');
    cookies().delete('jwt-auth.refresh-token');
    redirect('/auth/login');
}

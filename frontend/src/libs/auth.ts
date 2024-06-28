import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';
import { authApi } from './axios';
import errorHandler from '@/utils/errorHandler';
// import fs from 'fs';

// const PUBLIC_KEY = fs.readFileSync('./certs/private.pem', 'utf8');

const tokenCredentials = ['id', 'name', 'email', 'picture'];

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    scope: 'openid email profile',
                },
            },
        }),

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};
                if (!email || !password) return null;

                try {
                    const { data } = await authApi.post('/login', { email, password });

                    cookies().set('jwt-auth.access-token', data.accessToken);
                    cookies().set('jwt-auth.refresh-token', data.refreshToken);

                    // Handle the data from the API response
                    return data;
                } catch (err: any) {
                    const error = errorHandler(err);
                    throw new Error(error);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!account) return false;

            if (account.provider === 'google') {
                if (!profile) return false;

                try {
                    const { sub, name, email, picture } = profile;

                    const { data } = await authApi.post('/providers/create', {
                        providerId: sub,
                        name,
                        email,
                        picture,
                        provider: 'google',
                    });

                    cookies().set('jwt-auth.access-token', data.accessToken);
                    cookies().set('jwt-auth.refresh-token', data.refreshToken);

                    // Handle the data from the API response
                    return true;
                } catch (err: any) {
                    const error = errorHandler(err);
                    throw new Error(error);
                }
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },

        session({ session, token }) {
            // console.log('session', session, token, user);
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
        jwt({ token, account, user }) {
            // console.log('jwt', token, account, user, profile);
            if (account) {
                for (const key in user) {
                    if (tokenCredentials.includes(key)) {
                        token[key] = user[key as keyof typeof user];
                    }
                }
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/log-in',
    },
    session: {
        strategy: 'jwt',
    },
    secret: '123456',
};

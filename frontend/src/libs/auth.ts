import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';
import { authApi } from './axios';
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

                    cookies().set('access_token', data.accessToken);
                    cookies().set('refresh_token', data.refreshToken);

                    // Handle the data from the API response
                    return data;
                } catch (err: any) {
                    console.log(err);
                    throw err.message;
                }
            },
        }),
    ],
    callbacks: {
        signIn({ account, user, profile, credentials }) {
            if (!account) return false;

            if (account.provider === 'google') {
                console.log(user, credentials);
                console.log('profile is google', profile);
                return true;
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },

        session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            console.log('session ', session, token);
            return session;
        },
        jwt({ token, account, user }) {
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

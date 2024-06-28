import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & Session['user'];
    }

    interface User {
        _id: string;
    }

    interface Profile {
        picture: string;
    }
}

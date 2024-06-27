import axios from 'axios';
import { notFound } from 'next/navigation';
import ResetForm from './ResetForm';
import errorHandler from '@/utils/errorHandler';
import { authApi } from '@/libs/axios';

async function verify(email: string, otp: string) {
    try {
        const response = await authApi.post('/verify', { email, otp });

        console.log(response.data);
        return { data: response.data, error: null };
    } catch (err) {
        const error = errorHandler(err);
        throw error;
        // return { data: null, error };
    }
}

type PageProps = {
    searchParams: {
        email: string;
        code: string;
    };
};

export default async function Page({ searchParams }: PageProps) {
    const { email, code } = searchParams;
    const { error } = await verify(email, code);

    if (error) return notFound();

    return <ResetForm />;
}

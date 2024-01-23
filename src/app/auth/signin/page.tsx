'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import Button from '@/src/components/Button';
import Input from '@/src/components/inputs/input';
import AuthSocialButton from '../components/AuthSocialButton';
import Link from 'next/link';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSignin: SubmitHandler<FieldValues> = async data => {
        setLoading(true);

        try {
            const response = await axios.post('/api/users/signin', {
                email: data.email,
                password: data.password,
            });

            const { success, message, token } = response.data;

            if (!success) console.log('Something went wrong', message);

            setCookie('accessToken', token);
        } catch (e) {
            console.log('Login Failed', e);
        } finally {
            setLoading(false);
        }
    };

    const socialAction = (action: string) => {
        setLoading(true);
    };

    return (
        <div
            className='
                flex 
                min-h-screen
                flex-col 
                sm:justify-center
                py-12 sm:px-6 lg:px-8 
                bg-gray-100 transition-all'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <Image
                    alt='logo'
                    height='48'
                    width='48'
                    className='mx-auto w-auto'
                    src='/images/logo.png'
                />
                <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-800'>
                    Sign in to your account
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-2'>
                <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                    <form
                        className='space-y-5'
                        onSubmit={handleSubmit(onSignin)}
                        autoComplete='false'>
                        <Input
                            id='email'
                            label='Email address'
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                        <Input
                            type='password'
                            id='password'
                            label='Password'
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                        <Button disabled={loading} fullWidth type='submit'>
                            Sign in
                        </Button>
                    </form>
                    <div className='mt-6'>
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-300' />
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='bg-white px-2 text-gray-500'>
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className='mt-6 flex gap-2'>
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialAction('google')}
                            />
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialAction('github')}
                            />
                        </div>
                    </div>

                    <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                        <div>New to Messenger?</div>
                        <Link href='/auth/signup' className='underline cursor-pointer'>
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

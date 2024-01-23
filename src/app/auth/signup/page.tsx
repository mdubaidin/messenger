'use client';

import Image from 'next/image';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '@/src/components/Button';
import Input from '@/src/components/inputs/input';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import AuthSocialButton from '../components/AuthSocialButton';
import Link from 'next/link';

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });

    const onSignup: SubmitHandler<FieldValues> = async data => {
        setLoading(true);

        try {
            const response = await axios.post('/api/users/signup', data);

            console.log(response.data.message);
        } catch (e) {
            console.log('Signup Failed', e);
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
                    Create a new account
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-2'>
                <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                    <form
                        className='space-y-5'
                        onSubmit={handleSubmit(onSignup)}
                        autoComplete='false'>
                        <Input
                            id='name'
                            label='Name'
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                        <Input
                            id='username'
                            label='Username'
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                        <Input
                            id='email'
                            label='Email'
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                        <Input
                            id='password'
                            label='Password'
                            type='password'
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                        <Button disabled={loading} fullWidth type='submit'>
                            Sign up
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
                        <div>Already have an account?</div>
                        <Link href='/auth/signin' className='underline cursor-pointer'>
                            Sign-in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

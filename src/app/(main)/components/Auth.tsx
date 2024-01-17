'use client';

import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/src/components/inputs/input';
import Button from '@/src/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { authServer } from '@/src/utilities/axios';
import { setCookie } from 'cookies-next';

type Variant = 'LOGIN' | 'REGISTER';

const Auth = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleVariant = useCallback(
        () => (variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')),
        [variant]
    );

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

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            try {
                const response = await authServer.post('/open/signup', data);

                console.log(response.data.message);
            } catch (e) {
                console.log('Signup Failed', e);
            }
        }

        if (variant === 'LOGIN') {
            try {
                const response = await authServer.post('/open/login', {
                    email: data.email,
                    password: data.password,
                });

                const { success, message, token } = response.data;

                if (!success) console.log('Something went wrong', message);

                setCookie('accessToken', token);
            } catch (e) {
                console.log('Login Failed', e);
            }
        }
        setIsLoading(false);
    };

    const socialAction = (action: string) => {
        setIsLoading(true);
    };

    const loginFields = (
        <React.Fragment>
            <Input
                id='email'
                label='Email address'
                register={register}
                errors={errors}
                disabled={isLoading}
            />
            <Input
                type='password'
                id='password'
                label='Password'
                register={register}
                errors={errors}
                disabled={isLoading}
            />
            <Button disabled={isLoading} fullWidth type='submit'>
                Sign in
            </Button>
        </React.Fragment>
    );

    const registerFields = (
        <React.Fragment>
            <Input
                id='name'
                label='Full Name'
                register={register}
                errors={errors}
                disabled={isLoading}
            />
            <Input
                id='username'
                label='Username'
                register={register}
                errors={errors}
                disabled={isLoading}
            />
            <Input
                id='email'
                label='Email'
                register={register}
                errors={errors}
                disabled={isLoading}
            />
            <Input
                id='password'
                label='Password'
                type='password'
                register={register}
                errors={errors}
                disabled={isLoading}
            />
            <Button disabled={isLoading} fullWidth type='submit'>
                Sign up
            </Button>
        </React.Fragment>
    );

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-2'>
            <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-5' onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
                    {variant === 'LOGIN' ? loginFields : registerFields}
                </form>
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300' />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-white px-2 text-gray-500'>Or continue with</span>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                    </div>
                </div>

                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div className='underline cursor-pointer' onClick={toggleVariant}>
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

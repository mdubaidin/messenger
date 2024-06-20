'use client';

import { Box, Button, CircularProgress, Divider, Link, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Form from '@/components/Form';
import FacebookButton from '@/components/FacebookButton';
import GoogleButton from '@/components/GoogleButton';
import Input from '@/components/Input';
import useErrorHandler from '@/hooks/useErrorHandler';
import axios from 'axios';
import { isEmpty } from '@/utils/function';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMessage } from '@/providers/Provider';

// interface FormInput {
//     name: string;
//     email: string;
//     password: string;
// }

const AuthForm = () => {
    const errorHandler = useErrorHandler();
    const router = useRouter();
    const params = useSearchParams();
    const { showError } = useMessage();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            await axios.post('/auth/create', data);

            router.push('/auth/log-in');
        } catch (err) {
            errorHandler(err);
        }
    };

    useEffect(() => {
        const error = params.get('e');
        if (error) {
            showError(error);
        } else {
            router.push('/c');
        }
    }, []);

    return (
        <Box
            sx={{
                width: { xs: 'auto', xm: '400px' },
                py: 5,
                transition: '.2s',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Typography
                sx={{
                    backgroundImage:
                        'linear-gradient(83.84deg, rgb(0, 136, 255) -6.87%, rgb(160, 51, 255) 26.54%, rgb(255, 92, 135) 58.58%)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '80px',
                    fontWeight: 500,
                    lineHeight: '75px',
                    fontFamily:
                        'Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif',
                }}>
                Let&apos;s <br />
                get started!
            </Typography>

            <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                Messenger helps you connect and share with the people in your life.
            </Typography>

            {isEmpty(errors) ? null : (
                <Typography variant='body2' color='red' mb={1.5}>
                    {Object.values(errors)[0]?.message as string}
                </Typography>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    variation='auth'
                    fieldName='name'
                    placeholder='Full name'
                    register={register}
                    registerOptions={{
                        required: 'Full name is required',
                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                        maxLength: {
                            value: 40,
                            message: 'Name exceeds the maximum character limit',
                        },
                    }}
                />

                <Input
                    fieldName='email'
                    variation='auth'
                    placeholder='Email address'
                    register={register}
                    registerOptions={{
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Email address must be valid',
                        },
                    }}
                />

                <Input
                    fieldName='password'
                    variation='auth'
                    placeholder='Password'
                    type='password'
                    register={register}
                    registerOptions={{ required: 'Password is required' }}
                    sx={{ mb: 2.5 }}
                />
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting}
                    endIcon={isSubmitting && <CircularProgress color='inherit' size='small' />}
                    sx={{
                        mt: 2,
                        mb: 2.5,
                        py: 1,
                        borderRadius: '10px',
                    }}>
                    Sign Up
                </Button>
            </Form>

            <Divider variant='middle' sx={{ borderWidth: '2px' }}>
                <Typography variant='body2' color='text.secondary'>
                    Or create an account with
                </Typography>
            </Divider>

            <Stack mt={3} spacing={2} my={3}>
                <GoogleButton
                    name='Sign up with Google'
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}
                />
                <FacebookButton name='Sign up with Facebook' />
            </Stack>

            <Stack direction='row' justifyContent='center' mt={3} spacing={2}>
                <div>Already have an account?</div>
                <Link href='/auth/log-in' color='primary.main' fontWeight={500}>
                    Sign in
                </Link>
            </Stack>
        </Box>
    );
};

export default AuthForm;

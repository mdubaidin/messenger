'use client';

import {
    Box,
    Button,
    ButtonBaseOwnProps,
    Card,
    Divider,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Form from '@/components/Form';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import GoogleButton from '@/components/GoogleButton';
import FacebookButton from '@/components/FacebookButton';

const AuthForm = () => {
    const router = useRouter();

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

    const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);

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
                Hang out <br />
                whenever, <br /> wherever
            </Typography>
            <Typography variant='body1' mb={4} color='text.secondary'>
                Messenger makes it easy and fun to stay close to your favourite people.
            </Typography>
            <Form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    variation='auth'
                    placeholder='Email address'
                    size='small'
                    fullWidth
                    {...register('email')}
                />

                <TextField
                    variation='auth'
                    placeholder='Password'
                    size='small'
                    fullWidth
                    {...register('password')}
                />
                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => {
                        console.log('access_token');
                        setCookie('accessToken', 'abcdefghijklmnopqrstuvwxyz', {
                            domain: process.env.DOMAIN,
                        });
                        router.push('/c');
                    }}
                    sx={{ my: 2, py: 1, borderRadius: '10px' }}>
                    Log In
                </Button>
            </Form>

            <Divider variant='middle' sx={{ borderWidth: '2px' }}>
                <Typography variant='body2' color='text.secondary'>
                    Or continue with
                </Typography>
            </Divider>

            <Stack mt={3} spacing={2} my={3.5}>
                <GoogleButton name='Continue with Google' />
                <FacebookButton name='Continue with Facebook' />
            </Stack>

            <Stack direction='row' justifyContent='center' spacing={2}>
                <div>New to Messenger?</div>
                <Link href='/auth/create' color='primary.main' fontWeight={500}>
                    Create an account
                </Link>
            </Stack>
        </Box>
    );
};

export default AuthForm;

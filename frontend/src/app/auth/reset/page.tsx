'use client';

import { Box, Typography, Stack, Button, CircularProgress, Link } from '@mui/material';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import { notFound, useRouter } from 'next/navigation';
import useErrorHandler from '@/hooks/useErrorHandler';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { isEmpty } from '@/utils/function';
import Input from '@/components/Input';
import { useMessage } from '@/providers/Provider';

async function Page() {
    const router = useRouter();
    const errorHandler = useErrorHandler();
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(true);
    const { showSuccess } = useMessage();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            await axios.patch('/auth/create-password', { email, password: data.password });

            showSuccess('Password changed!');
            router.push('/auth/login');
        } catch (err) {
            errorHandler(err);
        }
    };

    const verify = useCallback(
        async (email: string, otp: string) => {
            try {
                await axios.post('/auth/verify', { email, otp });
                setEmail(email);
                return;
            } catch (err) {
                setValid(false);
                errorHandler(err);
            }
        },
        [errorHandler]
    );

    useEffect(() => {
        const params = new URLSearchParams(globalThis.location.search);
        const email = params.get('email');
        const code = params.get('code');

        if (email && code) {
            throw verify(email, code);
        } else {
            notFound();
        }
    }, []);

    if (!valid) return notFound();

    return (
        <Box
            sx={{
                width: { xs: 'auto', xm: '420px' },
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
                Reset Password
            </Typography>
            <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                Guard your digital gate with a strong password: a mix of characters, length, and
                uniqueness.
            </Typography>

            {isEmpty(errors) ? null : (
                <Typography variant='body2' color='red' mb={1.5}>
                    {Object.values(errors)[0]?.message as string}
                </Typography>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    variation='auth'
                    type='password'
                    placeholder='Password'
                    fieldName='password'
                    register={register}
                    registerOptions={{ required: 'Password is required' }}
                />
                <Input
                    variation='auth'
                    type='password'
                    placeholder='Confirm password'
                    fieldName='confirmPassword'
                    register={register}
                    registerOptions={{
                        required: 'Confirm password is required',
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return `Password did not match`;
                            }
                        },
                    }}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={isSubmitting}
                    endIcon={
                        isSubmitting && (
                            <CircularProgress sx={{ color: 'contrastColor' }} size='small' />
                        )
                    }
                    sx={{ my: 2, py: 1, borderRadius: '10px' }}>
                    Reset Password
                </Button>
            </Form>

            <Stack direction='row' justifyContent='center' mt={3} spacing={2}>
                <div>Already have an account?</div>
                <Link href='/auth/log-in' color='primary.main' fontWeight={500}>
                    Log in
                </Link>
            </Stack>
        </Box>
    );
}

export default Page;

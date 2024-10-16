'use client';

import { Box, Button, CircularProgress, Link, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Form from '@/components/lib/form';
import { useRouter } from 'next/navigation';
import { isEmpty } from '@/utils/function';
import Input from '@/components/lib/input';
import useErrorHandler from '@/hooks/useErrorHandler';
import { authApi } from '@/libs/axios';
import { toast } from 'sonner';

const AuthForm = () => {
    const router = useRouter();
    const errorHandler = useErrorHandler();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            const response = await authApi.post('/login', data);

            const loginData = response.data;

            if (loginData && loginData.success) {
                toast.success('Successfully Logged in');
                return router.push('/chats');
            }

            throw new Error('Failed to login');
        } catch (err: any) {
            errorHandler(err);
        }
    };

    const watchFields = watch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const error = params.get('e');
        const status = params.get('s');
        if (error && status !== '200') {
            toast.error(error);
        }
        if (status === '200') {
            router.push('/chats');
        }
    }, [router]);

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
                    backgroundImage: 'linear-gradient(83.84deg, rgb(0, 136, 255) -6.87%, rgb(160, 51, 255) 26.54%, rgb(255, 92, 135) 58.58%)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '80px',
                    fontWeight: 500,
                    lineHeight: '75px',
                    // fontFamily:
                    //     'Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif',
                }}>
                Hang out <br />
                whenever, <br /> wherever
            </Typography>
            <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                Messenger makes it easy and fun to stay close to your favourite people.{' '}
            </Typography>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input fieldName='user' variation='auth' placeholder='Phone number, username or email' register={register} />

                <Input variation='auth' type='password' placeholder='Password' fieldName='password' register={register} sx={{ mb: 1.5 }} />

                <Button
                    href='/auth/identify'
                    sx={{
                        px: 1,
                        py: 0,
                        m: 0,
                        color: '#7F8185',
                        lineHeight: 1,
                        float: 'right',
                    }}>
                    Forgot password?
                </Button>

                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={isSubmitting || !(watchFields.user && watchFields.password)}
                    endIcon={isSubmitting && <CircularProgress sx={{ color: 'contrastColor' }} size='small' />}
                    sx={{ mt: 1.5, mb: 2, py: 1, borderRadius: '10px' }}>
                    Log In
                </Button>
            </Form>

            <Stack direction='row' justifyContent='center' spacing={2}>
                <div>New to Messenger?</div>
                <Link href='/auth/create-account' color='primary.main' fontWeight={500}>
                    Create an account
                </Link>
            </Stack>
        </Box>
    );
};

export default AuthForm;

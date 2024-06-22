'use client';

import { Box, Typography, Button, CircularProgress, Link, Stack } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import { useRouter } from 'next/navigation';
import useErrorHandler from '@/hooks/useErrorHandler';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { isEmpty } from '@/utils/function';
import Input from '@/components/Input';

const ForgotPassword = () => {
    const errorHandler = useErrorHandler();
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            await axios.post('/auth/identify', data);

            setEmailSent(true);
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
        <Box
            sx={{
                width: { xs: 'auto', xm: '420px' },
                py: 5,
                transition: '.2s',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {emailSent ? (
                <Box>
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
                        Email Sent!
                    </Typography>

                    <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                        Kindly check your email inbox. we have just sent your reset password link
                    </Typography>
                </Box>
            ) : (
                <Box>
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
                        Trouble Logging in?
                    </Typography>

                    <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                        Please enter your email address and we&apos;ll send you a link to get back
                        into your account.
                    </Typography>

                    {isEmpty(errors) ? null : (
                        <Typography variant='body2' color='red' mb={1.5}>
                            {Object.values(errors)[0]?.message as string}
                        </Typography>
                    )}

                    <Form onSubmit={handleSubmit(onSubmit)}>
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

                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            disabled={isSubmitting}
                            endIcon={
                                isSubmitting && <CircularProgress color='inherit' size='small' />
                            }
                            sx={{
                                mt: 1,
                                mb: 2,
                                py: 1,
                                borderRadius: '10px',
                            }}>
                            Send login link
                        </Button>
                        <Stack direction='row' justifyContent='center' mt={3} spacing={2}>
                            <div>Already have an account?</div>
                            <Link href='/auth/log-in' color='primary.main' fontWeight={500}>
                                Log in
                            </Link>
                        </Stack>
                    </Form>
                </Box>
            )}
        </Box>
    );
};

export default ForgotPassword;

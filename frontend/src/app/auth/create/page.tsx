'use client';

import {
    Box,
    Button,
    ButtonBaseOwnProps,
    Card,
    Divider,
    Grid,
    Link,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Form from '@/components/Form';
import FacebookButton from '@/components/FacebookButton';
import GoogleButton from '@/components/GoogleButton';

const AuthForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);

    return (
        <Box
            sx={{
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
                Get Started!
            </Typography>
            <Typography variant='body1' mb={4} color='text.secondary'>
                Messenger helps you connect and share with the people in your life.
            </Typography>
            <Form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='row' spacing={2} mb={0.5}>
                    <Box flexGrow={1}>
                        <TextField
                            variation='auth'
                            size='small'
                            placeholder='First name'
                            fullWidth
                            {...register('firstName')}
                        />
                    </Box>
                    <Box flexGrow={1}>
                        <TextField
                            variation='auth'
                            placeholder='Last name'
                            size='small'
                            fullWidth
                            {...register('lastName')}
                        />
                    </Box>
                </Stack>
                <Grid container spacing={2} mb={0.5}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variation='auth'
                            fullWidth
                            size='small'
                            type='date'
                            placeholder='Date of birth'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select
                            variation='auth'
                            name='gender'
                            value=''
                            fullWidth
                            sx={{
                                '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                                    padding: '8.5px 14px',
                                },
                            }}>
                            <MenuItem disabled value='' sx={{ color: 'text.secondary' }}>
                                Gender
                            </MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                <TextField
                    variation='auth'
                    size='small'
                    placeholder='Email address'
                    fullWidth
                    {...register('email')}
                    sx={{ mb: 2.5 }}
                />

                <TextField
                    variation='auth'
                    size='small'
                    placeholder='Password'
                    fullWidth
                    sx={{ mb: 2.5 }}
                    {...register('password')}
                />
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    sx={{
                        mt: 2,
                        mb: 2.5,
                        py: 1,
                        borderRadius: '10px',
                    }}>
                    Create Account
                </Button>
            </Form>

            <Divider variant='middle' sx={{ borderWidth: '2px' }}>
                <Typography variant='body2' color='text.secondary'>
                    Or create an account with
                </Typography>
            </Divider>

            <Stack mt={3} spacing={2} my={3} direction={{ xs: 'column', xm: 'row' }}>
                <GoogleButton name='Sign up with Google' />
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

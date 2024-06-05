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

interface ButtonProps extends ButtonBaseOwnProps {
    icon: IconType;
    onClick: () => void;
    platform: string;
}

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
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

    const socialAction = (action: string) => {
        setIsLoading(true);
    };

    return (
        <Box
            maxWidth='900px'
            mx='auto'
            display='flex'
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent='center'>
            <Box>
                <Typography
                    variant='h5'
                    align='center'
                    fontWeight={600}
                    mt={2}
                    mb={4}
                    display={{ xs: 'none', sm: 'block' }}>
                    Sign in to your account
                </Typography>
                <Card
                    sx={{
                        borderRadius: '8px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: { xs: 'transparent', sm: 'divider' },
                        width: { xs: '100%', sm: '478px' },
                        py: 5,
                        px: { xs: 3, sm: 5 },
                        transition: '.2s',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    elevation={0}>
                    <Typography variant='h4' fontWeight={600}>
                        Connect with us
                    </Typography>
                    <Typography variant='body2' mb={4} color='text.secondary'>
                        Messenger makes it easy and fun to stay close to your favourite people.
                    </Typography>
                    <Form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant='body2' color='text.secondary' fontWeight={600} mb={1}>
                            Email address
                        </Typography>
                        <TextField
                            size='small'
                            disabled={isLoading}
                            fullWidth
                            {...register('email')}
                        />
                        <Typography variant='body2' color='text.secondary' fontWeight={600} mb={1}>
                            Password
                        </Typography>
                        <TextField
                            size='small'
                            disabled={isLoading}
                            fullWidth
                            {...register('password')}
                        />
                        <Button
                            disabled={isLoading}
                            fullWidth
                            variant='contained'
                            onClick={() => {
                                console.log('access_token');
                                setCookie('access_token', 'abcdefghijklmnopqrstuvwxyz', {
                                    domain: 'localhost',
                                });
                                router.push('/c');
                            }}
                            sx={{ my: 2, py: 1 }}>
                            Sign in
                        </Button>
                    </Form>

                    <Divider variant='middle' sx={{ borderWidth: '2px' }}>
                        <Typography variant='body2' color='text.secondary'>
                            Or continue with
                        </Typography>
                    </Divider>

                    <Stack mt={3} spacing={2} my={3.5}>
                        <SocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                            platform='Sign up with Github'
                        />
                        <SocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                            platform='Sign up with Google'
                        />
                    </Stack>

                    <Stack direction='row' justifyContent='center' spacing={2}>
                        <div>New to Messenger?</div>
                        <Link href='/auth/create' color='primary.main'>
                            Create an account
                        </Link>
                    </Stack>
                </Card>
            </Box>
        </Box>
    );
};

const SocialButton = (props: ButtonProps) => {
    const { icon: Icon, onClick, platform } = props;

    return (
        <Button
            variant='outlined'
            onClick={onClick}
            startIcon={<Icon />}
            fullWidth
            sx={{
                '&, &:hover': {
                    py: 0.8,
                    color: 'gray',
                    borderColor: 'gray',
                    backgroundColor: 'transparent',
                    fontWeight: 500,
                },
            }}>
            {platform}
        </Button>
    );
};

export default AuthForm;

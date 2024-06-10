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

interface ButtonProps extends ButtonBaseOwnProps {
    icon: IconType;
    onClick: () => void;
    platform: string;
}

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                    Create your Messenger account
                </Typography>
                <Card
                    sx={{
                        borderRadius: '8px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: { xs: 'transparent', sm: 'divider' },
                        width: { xs: '100%', sm: '658px' },
                        py: 5,
                        px: { xs: 3, sm: 5 },
                        transition: '.2s',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    elevation={0}>
                    <Typography variant='h4' fontWeight={600}>
                        Get Started!
                    </Typography>
                    <Typography variant='body2' mb={4} color='text.secondary'>
                        Messenger helps you connect and share with the people in your life.
                    </Typography>
                    <Form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction='row' spacing={2}>
                            <Box flexGrow={1}>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    fontWeight={600}
                                    mb={1}>
                                    First Name
                                </Typography>
                                <TextField
                                    size='small'
                                    disabled={isLoading}
                                    fullWidth
                                    {...register('firstName')}
                                />
                            </Box>
                            <Box flexGrow={1}>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    fontWeight={600}
                                    mb={1}>
                                    Last Name
                                </Typography>
                                <TextField
                                    size='small'
                                    disabled={isLoading}
                                    fullWidth
                                    {...register('lastName')}
                                />
                            </Box>
                        </Stack>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    fontWeight={600}
                                    mb={1}>
                                    Date of birth
                                </Typography>
                                <TextField fullWidth size='small' type='date' sx={{ mb: 0 }} />
                            </Grid>
                            <Grid item xs={12} sm={6} mb={1}>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    fontWeight={600}
                                    mb={1}>
                                    Gender
                                </Typography>
                                <Select
                                    name='gender'
                                    value=''
                                    fullWidth
                                    sx={{
                                        '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input':
                                            {
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
                            type='submit'
                            variant='contained'
                            sx={{ my: 2, py: 1 }}>
                            Sign up
                        </Button>
                    </Form>

                    <Divider variant='middle' sx={{ borderWidth: '2px' }}>
                        <Typography variant='body2' color='text.secondary'>
                            Or create an account with
                        </Typography>
                    </Divider>

                    <Stack mt={3} spacing={2} my={3} direction={{ xs: 'column', sm: 'row' }}>
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

                    <Stack direction='row' justifyContent='center' mt={3} spacing={2}>
                        <div>Already have an account?</div>
                        <Link href='/auth/sign-in' color='primary.main'>
                            Sign in
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

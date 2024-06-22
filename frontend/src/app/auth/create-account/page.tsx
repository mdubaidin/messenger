'use client';

import { Box, Button, CircularProgress, Divider, Link, Stack, Typography } from '@mui/material';
import React, {
    useEffect,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react';
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

interface FormInput {
    name: string;
    email: string;
    password: string;
    otp: string;
}

interface FormContextProps {
    data: FormInput;
    setData: Dispatch<SetStateAction<FormInput>>;
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
}

const initialFormInput: FormInput = { name: '', email: '', password: '', otp: '' };

const FormContext = createContext<FormContextProps>({
    data: initialFormInput,
    setData: () => {},
    step: 0,
    setStep: () => {},
});

const Steps = [CreateAccount, EmailConfirmation];

const Main = () => {
    const [data, setData] = useState<FormInput>(initialFormInput);
    const [step, setStep] = useState(0);

    return (
        <Box
            sx={{
                width: { xs: 'auto', xm: '420px' },
                py: 5,
                transition: '.2s',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <FormContext.Provider value={{ data, setData, step, setStep }}>
                {React.createElement(Steps[step])}
            </FormContext.Provider>
        </Box>
    );
};

function CreateAccount() {
    const { setData, setStep } = useContext(FormContext);
    const errorHandler = useErrorHandler();
    const router = useRouter();
    const { showError } = useMessage();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            await axios.post('/auth/create-account/step1', { email: data.email });

            setData(data as FormInput);
            setStep(1);
        } catch (err) {
            errorHandler(err);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const error = params.get('e');
        if (error) {
            showError(error);
        }
    }, [router, showError]);

    return (
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
                    Create account
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
                    Log in
                </Link>
            </Stack>
        </Box>
    );
}

function EmailConfirmation() {
    const { data, setStep } = useContext(FormContext);
    const errorHandler = useErrorHandler();
    const router = useRouter();
    const { showSuccess } = useMessage();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async inputData => {
        try {
            await axios.post('/auth/create-account/step2', { ...data, ...inputData });

            showSuccess('Account created');
            router.push('/auth/log-in');
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
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
                Email Confirmation
            </Typography>

            <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                Messenger wants to make sure that it&apos;s really you. Messenger will send an email
                with a six-digit confirmation code on your{' '}
                <Link href={`mailto:${data.email}`}>{data.email}</Link>.
            </Typography>

            {isEmpty(errors) ? null : (
                <Typography variant='body2' color='red' mb={1.5}>
                    {Object.values(errors)[0]?.message as string}
                </Typography>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    variation='auth'
                    fieldName='otp'
                    placeholder='Email confirmation code'
                    type='number'
                    register={register}
                    registerOptions={{
                        required: 'Email confirmation code is required',
                        minLength: { value: 6, message: 'Code must be at least 6 characters' },
                        maxLength: { value: 6, message: 'Code must be at least 6 characters' },
                    }}
                />

                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting}
                    endIcon={isSubmitting && <CircularProgress color='inherit' size='small' />}
                    sx={{
                        mt: 2,
                        mb: 2,
                        py: 1,
                        borderRadius: '10px',
                    }}>
                    Confirm
                </Button>
                <Button
                    fullWidth
                    variant='outlined'
                    onClick={() => {
                        setStep(0);
                    }}
                    sx={{
                        mb: 2.5,
                        py: 1,
                        borderRadius: '10px',
                    }}>
                    Back
                </Button>
            </Form>
        </Box>
    );
}

export default Main;

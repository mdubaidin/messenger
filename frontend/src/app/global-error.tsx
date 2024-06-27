'use client';

import React, { FC } from 'react';
import Image from '@/components/Image';
import { Button, Container, Stack, Typography } from '@mui/material';

type ErrorProps = {
    error: any;
    reset: () => void;
};

const GlobalError: FC<ErrorProps> = ({ error, reset }) => {
    return (
        <Container maxWidth='lg'>
            <Stack
                justifyContent='center'
                alignItems='center'
                minHeight='calc(100vh - 80px)'
                textAlign='center'
                my={5}>
                <Image name='logo.png' sx={{ height: '65px', mb: 2 }} alt='logo' />{' '}
                <Typography variant='h4' mb={1}>
                    {error.message || 'Some error occurred'}
                </Typography>
                <Typography variant='subtitle1'>
                    The page that you followed may be broken or the Page may have been removed.
                    That&apos;s all we know
                </Typography>
                <Button
                    variant='contained'
                    onClick={reset}
                    sx={{ mt: 1.5, mb: 2, py: 1, borderRadius: '10px' }}>
                    Try again
                </Button>
            </Stack>
        </Container>
    );
};

export default GlobalError;

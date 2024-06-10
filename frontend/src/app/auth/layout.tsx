import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            display='flex'
            minHeight='100dvh'
            flexDirection='column'
            justifyContent={{ xs: 'flex-start', sm: 'center' }}>
            <Stack direction='row' justifyContent='center' display={{ xs: 'none', sm: 'flex' }}>
                <Image alt='logo' height='58' width='58' src='/images/logo.png' />
            </Stack>

            {children}
        </Box>
    );
};

export default AuthLayout;

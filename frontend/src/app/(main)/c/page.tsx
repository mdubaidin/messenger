'use client';

import { Stack, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';

const Home = () => {
    const { data } = useSession();

    console.log(data);
    return (
        <Stack direction='row' justifyContent='center' alignItems='center' height='100%'>
            <Typography variant='h5'>Select a chat or start a new conversation</Typography>
        </Stack>
    );
};

export default Home;

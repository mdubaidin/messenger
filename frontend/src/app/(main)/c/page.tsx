import { Stack, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
    return (
        <Stack direction='row' justifyContent='center' alignItems='center' height='100%'>
            <Typography variant='h5'>Select a chat or start a new conversation</Typography>
        </Stack>
    );
};

export default Home;

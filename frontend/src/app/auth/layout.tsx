import Image from '@/components/Image';
import { Box, Container, Grid, Typography } from '@mui/material';
import React, { Suspense } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            display='flex'
            minHeight='100dvh'
            flexDirection='column'
            justifyContent='center'
            bgcolor='background.paper'>
            <Container
                sx={{
                    maxWidth: { xs: '600px', xm: '1205px' },
                    mx: 'auto',
                    px: 2,
                    transition: '.2s',
                }}>
                <Box display='inline-flex' alignItems='center' mt={2} sx={{ cursor: 'pointer' }}>
                    <Image alt='logo' name='logo.png' sx={{ height: '35px' }} />
                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: 500,
                            ml: 1,
                            backgroundImage:
                                'linear-gradient(83.84deg, rgb(0, 136, 255) -6.87%, rgb(160, 51, 255) 26.54%, rgb(255, 92, 135) 58.58%)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}>
                        Messenger
                    </Typography>
                </Box>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item xs={12} xm={5}>
                        <Suspense>{children}</Suspense>
                    </Grid>
                    <Grid item xs={0} xm={5} display={{ xs: 'none', xm: 'block' }}>
                        <Image alt='logo' name='auth-banner.png' />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AuthLayout;

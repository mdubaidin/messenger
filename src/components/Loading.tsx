import { CircularProgress, CssBaseline, Grid } from '@mui/material';
import { useEffect } from 'react';

export default function Loading({
    message,
    redirectTo = null,
}: {
    message: string;
    redirectTo: string | null;
}) {
    useEffect(() => {
        if (redirectTo) window.location.replace(redirectTo);
    }, [redirectTo]);

    return (
        <>
            <CssBaseline />
            <Grid
                container
                spacing={0}
                justifyContent='center'
                alignItems='center'
                style={{ height: '100dvh' }}>
                <Grid item>
                    <CircularProgress style={{ marginRight: '30px' }} />
                </Grid>
                <Grid item>{message}</Grid>
            </Grid>
        </>
    );
}

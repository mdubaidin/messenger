'use client';

import { IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Grid from '@mui/material/Grid';
import { ThemeContext, useTheme } from '@/theme';

const Settings = () => {
    const toggleTheme = useContext(ThemeContext).toggleTheme;
    const mode = useContext(ThemeContext).mode;

    return (
        <Grid container>
            <Grid item xs>
                <Typography variant='body1'>Theme</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={toggleTheme}>
                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default Settings;

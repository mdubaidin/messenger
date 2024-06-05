import React from 'react';
import { OptionType } from '.';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@/theme';

const Appearance = (props: OptionType) => {
    const { mode, toggleTheme } = useTheme();

    const { name } = props;
    return (
        <Box>
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
                {name}
            </Typography>
            <Typography variant='body1' fontWeight={500}>
                Theme
            </Typography>
        </Box>
    );
};

export default Appearance;

import React from 'react';
import { OptionType } from '.';
import { Box, Typography } from '@mui/material';

const Language = (props: OptionType) => {
    const { name } = props;
    return (
        <Box>
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
                {name}
            </Typography>
            <Typography variant='body1' fontWeight={500}>
                Show active status
            </Typography>
        </Box>
    );
};

export default Language;

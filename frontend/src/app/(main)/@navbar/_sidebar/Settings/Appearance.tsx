import React from 'react';
import { OptionType } from '.';
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ThemeOptions, useTheme } from '@/theme';

const Appearance = (props: OptionType) => {
    const { theme, setTheme } = useTheme();
    const selectChange = (e: SelectChangeEvent) => {
        setTheme(e.target.value as ThemeOptions);
    };

    const { name } = props;
    return (
        <Box width='100%'>
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
                {name}
            </Typography>
            <Typography variant='body1' fontWeight={500}>
                Theme
            </Typography>
            <Select
                value={theme}
                onChange={selectChange}
                fullWidth
                size='small'
                sx={{
                    '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                        padding: '8.5px 14px',
                    },
                }}>
                <MenuItem value='light'>Light</MenuItem>
                <MenuItem value='dark'>Dark</MenuItem>
                <MenuItem value='system'>System default</MenuItem>
            </Select>
        </Box>
    );
};

export default Appearance;

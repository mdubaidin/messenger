import React, { useState } from 'react';
import { OptionType } from '.';
import { Box, Typography } from '@mui/material';
import AntSwitch from '@/components/AntSwitch';

const ActiveStatus = (props: OptionType) => {
    const { name } = props;
    const [status, setStatus] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.checked);
    };

    return (
        <Box>
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
                {name}
            </Typography>
            <Typography variant='body2' fontWeight={600}>
                Show active status
            </Typography>
            <AntSwitch checked={status} onChange={handleChange} sx={{ mt: 3 }} />
            <Typography variant='subtitle1' fontWeight={600} mt={2} mb={1}>
                {name}: {status ? 'On' : 'Off'}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
                Your friends and contacts will see when you're active or recently active. You'll
                appear active or recently active unless you turn off the setting every place you •re
                using Messenger or Facebook. You'll also see when your friends and contacts are
                active or recently active.
            </Typography>
        </Box>
    );
};

export default ActiveStatus;

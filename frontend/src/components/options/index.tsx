import Box from '@mui/material/Box';
import React from 'react';
import SidebarOptions from './sidebarOptions';
import { getSessionCookieUser } from '@/actions/auth';

async function Index() {
    const user = await getSessionCookieUser();

    return (
        <Box width={65} display='flex' flexDirection='column' bgcolor='background.search' alignItems='center' py={1}>
            <SidebarOptions user={user} />
        </Box>
    );
}

export default Index;

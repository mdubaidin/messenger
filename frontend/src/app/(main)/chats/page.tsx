import { Box, IconButton, Stack, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';

// Icons
import { PiNotePencil } from 'react-icons/pi';
import AllChats from './components/AllChats';
import { notFound } from 'next/navigation';

export default function Page() {
    return (
        <Box display='flex' flexDirection='column' flexGrow={1}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                sx={{ textDecoration: 'none', color: 'text.primary', py: 1.5 }}>
                <Stack direction='row' alignItems='center'>
                    <Typography variant='h6' fontSize={24} fontWeight='600' pl={1}>
                        Chats
                    </Typography>
                </Stack>
                <Box>
                    <IconButton variant='paper'>
                        <PiNotePencil />
                    </IconButton>
                </Box>
            </Box>

            <Box px={0.8} mt={1}>
                <SearchBar />
            </Box>

            <AllChats />
        </Box>
    );
}

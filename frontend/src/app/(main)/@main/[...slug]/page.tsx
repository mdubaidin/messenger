'use client';

import Box from '@mui/material/Box';
import Header from './components/Header';
import Input from './components/Input';
import ChatSection from './components/ChatSection';
import { useAppSelector } from '@/redux/hook';
import Drawer from '@mui/material/Drawer';
import DefaultMessage from '@/components/DefaultMessage';
import Info from './info/Info';

const panelWidth = 370;

const Page = () => {
    const { chat, contactPanel } = useAppSelector(state => state.chat);

    return chat ? (
        <Box
            height='100%'
            display='flex'
            flexDirection='column'
            sx={{
                width: contactPanel ? `calc(100% - ${panelWidth}px)` : '100%',
                mr: contactPanel ? `${panelWidth}px` : 0,
            }}>
            <Header />
            <ChatSection />
            <Input />

            <Drawer
                variant='persistent'
                open={contactPanel}
                anchor='right'
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: panelWidth,
                        bgcolor: 'background.paper',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                    },
                }}>
                <Info />
            </Drawer>
        </Box>
    ) : (
        <DefaultMessage />
    );
};

export default Page;

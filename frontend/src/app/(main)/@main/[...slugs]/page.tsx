'use client';

import Box from '@mui/material/Box';
import Header from './components/Header';
import Input from './components/Input';
import ChatSection from './components/ChatSection';
import { useAppSelector } from '@/redux/hook';
import { Drawer, Stack, Typography } from '@mui/material';
import ContactPanel from './components/ContactPanel';
import DefaultMessage from '@/components/DefaultMessage';
import { usePathname } from 'next/navigation';

const panelWidth = 340;

const Page = ({ params }: { params: { slugs: string[] } }) => {
    const contactPanel = useAppSelector(state => state.contact.contactPanel);
    const pathname = usePathname().split('/');

    return pathname[1] ? (
        <Box
            height='100%'
            display='flex'
            flexDirection='column'
            sx={{
                width: contactPanel ? `calc(100% - ${panelWidth}px)` : '100%',
                mr: contactPanel ? `${panelWidth}px` : 0,
            }}>
            <Header contactId={pathname[1]} />
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
                        overflow: 'unset',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                    },
                }}>
                <ContactPanel />
            </Drawer>
        </Box>
    ) : (
        <DefaultMessage />
    );
};

export default Page;

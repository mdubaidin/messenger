'use client';

import Box from '@mui/material/Box';
import { useAppSelector } from '@/store/hook';
import MuiDrawer from '@mui/material/Drawer';
import DefaultMessage from '@/components/lib/defaultMessage';
import Drawer from '../../../../components/drawer/drawer';
import { Stack } from '@mui/material';

const panelWidth = 380;

const Main = ({ children }: { children: React.ReactNode }) => {
    const { chat, contactPanel } = useAppSelector(state => state.chat);

    return chat ? (
        <Stack
            overflow='hidden'
            height='100%'
            sx={{
                width: contactPanel ? `calc(100% - ${panelWidth}px)` : '100%',
                mr: contactPanel ? `${panelWidth}px` : 0,
            }}>
            {children}

            <MuiDrawer
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
                <Drawer />
            </MuiDrawer>
        </Stack>
    ) : (
        <DefaultMessage />
    );
};

export default Main;

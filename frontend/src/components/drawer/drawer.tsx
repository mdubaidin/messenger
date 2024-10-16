import Group from './group/Main';
import Chat from './chat/Main';
import { store } from '@/store/store';
import MuiDrawer from '@mui/material/Drawer';
import { useAppSelector } from '@/store/hook';
import { Suspense } from 'react';
import Loading from './loading';

const Drawer = () => {
    const { chat, contactPanel } = useAppSelector(state => state.chat);

    if (!chat) return null;

    return (
        <MuiDrawer
            variant='persistent'
            open={contactPanel}
            anchor='right'
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: 380,
                    bgcolor: 'background.paper',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                },
            }}>
            <Suspense fallback={<Loading />}>{chat.creator ? <Group /> : <Chat />}</Suspense>
        </MuiDrawer>
    );
};

export default Drawer;

import { Drawer, Stack } from '@mui/material';
import Box from '@mui/material/Box';

const drawerWidth = 370;

type LayoutProps = {
    children: React.ReactNode;
    navbar: React.ReactNode;
    main: React.ReactNode;
};

export default function Layout({ children, navbar, main }: Readonly<LayoutProps>) {
    return (
        <Box height='100dvh' bgcolor='background.paper'>
            <Drawer
                variant='permanent'
                sx={{
                    p: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        border: '1px solid',
                        borderColor: 'divider',
                    },
                }}>
                <Stack direction='row' height='100%'>
                    {navbar}
                    {children}
                </Stack>
            </Drawer>

            <Box component='main' height='inherit' sx={{ ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}>
                {main}
            </Box>
        </Box>
    );
}

import Box from '@mui/material/Box';

const drawerWidth = 370;

type LayoutProps = {
    children: React.ReactNode;
    navbar: React.ReactNode;
    main: React.ReactNode;
};

export default function Layout({ children, navbar, main }: Readonly<LayoutProps>) {
    return (
        <Box height='100dvh' display='flex' bgcolor='background.paper'>
            <Box
                minWidth={drawerWidth}
                display='flex'
                borderRight='1px solid'
                borderColor='divider'>
                {navbar}
                {children}
            </Box>

            <Box component='main' width={'100%'}>
                {main}
            </Box>
        </Box>
    );
}

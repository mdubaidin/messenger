import { Box } from '@mui/material';

const drawerWidth = 370;

export default function Layout({
    children,
    navbar,
}: Readonly<{
    children: React.ReactNode;
    navbar: React.ReactNode;
}>) {
    return (
        <Box
            sx={{
                // bgcolor: 'background.default',
                height: '100dvh',
                position: 'relative',
            }}>
            {navbar}

            <Box
                component='main'
                sx={{
                    width: {
                        xs: '100%',
                        xm: `calc(100% - ${drawerWidth}px)`,
                    },
                    ml: { xm: `${drawerWidth}px` },
                    height: { xs: 'calc(100dvh)' },
                    backgroundColor: 'background.default',
                }}>
                {children}
            </Box>
        </Box>
    );
}

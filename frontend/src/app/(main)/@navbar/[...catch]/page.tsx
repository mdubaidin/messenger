'use client';

import React, { useEffect, useState } from 'react';
import { AppBar, Box, Drawer } from '@mui/material';
import { usePathname } from 'next/navigation';
import Index from '../_sidebar';

const drawerWidth = 370;

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <>
            <AppBar
                elevation={0}
                component={Box}
                position='sticky'
                sx={{
                    width: {
                        xs: '100%',
                        xm: `calc(100% - ${drawerWidth}px)`,
                    },
                    ml: { xm: `${drawerWidth}px` },
                    backgroundColor: 'background.default',
                    borderBottom: '1px solid custom.border',
                    color: 'text.primary',
                    transition: 'ease-in-out 225ms, background-color 0s',
                }}>
                {/* <Toolbar
                    sx={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        '&': {
                            minHeight: { xs: '64px', xm: '86px' },
                            pl: { xs: 1, xm: 3 },
                            pr: 1,
                        },
                    }}>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <IconButton
                                onClick={handleDrawerToggle}
                                edge='start'
                                sx={{
                                    display: { xm: 'none' },
                                    mr: 1,
                                }}>
                                <MenuIcon sx={{ fontSize: '30px' }} />
                            </IconButton>
                        </Grid>
                        <Grid item display={{ xm: 'none' }}>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                component={NavLink}
                                href='/'
                                sx={{ textDecoration: 'none', color: 'text.primary' }}>
                                <Image alt='#logo' name='logo.png' sx={{ height: '30px' }} />
                                <Typography
                                    variant='h5'
                                    fontWeight={500}
                                    sx={{ ml: 1, color: '#808282' }}>
                                    OAuth
                                </Typography>
                                <Typography
                                    variant='h5'
                                    fontWeight={400}
                                    color='text.tertiary'
                                    sx={{ ml: 1, color: '#949697' }}>
                                    Admin
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={openProfileMenu}
                                sx={{
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    borderColor: 'primary.main',
                                    p: '3px',
                                }}>
                                <Avatar
                                    alt='Remy Sharp'
                                    src='data:image/jpeg;base64,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'
                                    sx={{ width: 30, height: 30 }}
                                />
                            </IconButton>

                            <Menu
                                anchorEl={anchorElProfile}
                                open={Boolean(anchorElProfile)}
                                onClose={closeProfileMenu}
                                sx={{
                                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                                        width: 'min(100%, 320px)',
                                        boxShadow:
                                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                                        border: '1px solid #00000017',
                                        bgcolor: 'custom.menu',
                                        px: 0.5,
                                        pt: 1.5,
                                    },
                                }}>
                                <Grid container spacing={2} alignItems='center' flexWrap='nowrap'>
                                    <Grid item>
                                        <Avatar
                                            alt='Remy Sharp'
                                            src='https://shorturl.at/fjqz9'
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant='subtitle1'
                                            component='div'
                                            fontWeight={600}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                            {user.firstName + ' ' + user.lastName}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='div'
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                            {user.email}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='a'
                                            href='#'
                                            color='primary.main'
                                            display='block'>
                                            My Account
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='a'
                                            href='#'
                                            color='primary.main'
                                            display='block'>
                                            My Profile
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction='row' mt={2}>
                                    <Button variant='text' fullWidth>
                                        Add account
                                    </Button>
                                    <Button variant='text' onClick={signOut} fullWidth>
                                        Sign out
                                    </Button>
                                </Stack>
                            </Menu>
                        </Grid>
                        <Grid item xs>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing={0}
                                display={{ xs: 'none', sm: 'flex' }}>
                                <div style={{ marginLeft: 5 }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            fontSize: 12,
                                            lineHeight: '14px',
                                        }}>
                                        {user.firstName + ' ' + user.lastName}
                                    </Typography>
                                    <Typography
                                        variant='caption'
                                        color='grey'
                                        display='block'
                                        fontSize={11}
                                        lineHeight='1.2'>
                                        {user.role} account
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>

                        <Grid item display={{ xs: 'none', xm: 'flex' }} alignItems='center' gap={1}>
                            {Options.map((link, i) => (
                                <Stack direction='row' key={i} alignItems='center'>
                                    <Button
                                        variant='text'
                                        startIcon={React.createElement(link.icon, {
                                            fontSize: 'small',
                                        })}
                                        LinkComponent={NavLink}
                                        href={link.to}
                                        sx={{
                                            color: 'text.primary',
                                            py: 0.5,
                                            px: 1,
                                            '&:hover': { backgroundColor: 'dividerHover' },
                                        }}>
                                        <Typography variant='body2' lineHeight='12px' fontSize={12}>
                                            {link.name}
                                        </Typography>
                                    </Button>

                                    <Divider
                                        orientation='vertical'
                                        variant='middle'
                                        flexItem
                                        sx={{ mx: 1 }}
                                    />
                                </Stack>
                            ))}
                        </Grid>
                    </Grid>
                </Toolbar> */}
            </AppBar>

            <Box
                component='nav'
                sx={{
                    width: { xm: drawerWidth },
                    flexShrink: { sm: 0 },
                    bgcolor: 'custom.menu',
                }}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', xm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            bgcolor: 'custom.menu',
                        },
                    }}>
                    <Index />
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', xm: 'block' },
                        p: 0,
                        '& .MuiDrawer-paper': {
                            boxShadow: 'none',
                            width: drawerWidth,
                            borderColor: 'divider',
                        },
                    }}>
                    <Index />
                </Drawer>
            </Box>
        </>
    );
}

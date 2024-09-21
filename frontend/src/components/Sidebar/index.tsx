'use client';

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Avatar,
    ListItemIcon,
    MenuItem,
    Menu,
    Modal,
    Divider,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import NavLink from '@/components/NavLink';
import { generateDate } from '@/utils/function';
import { Options } from '@/data/sidebar';
import { useMenu } from '@/hooks/useMenu';
import useModal from '@/hooks/useModal';
import Settings from './Settings';
import useErrorHandler from '@/hooks/useErrorHandler';
import { signOut, useSession } from 'next-auth/react';
import { authApi } from '@/libs/axios';

// Icons
import { MdLogout } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import { useAppSelector } from '@/redux/hook';

const Index = () => {
    const { anchorEl, openMenu, closeMenu } = useMenu();
    const { modalState, openModal, closeModal } = useModal();
    const { data: user } = useSession();
    const errorHandler = useErrorHandler();
    const chat = useAppSelector(state => state.chat.chat);

    const logout = async () => {
        try {
            await authApi.get('/logout');
            signOut({ callbackUrl: '/auth/log-in' });
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
        <>
            <Box
                width={70}
                display='flex'
                flexDirection='column'
                bgcolor='background.search'
                alignItems='center'
                py={1}>
                <List disablePadding sx={{ flexGrow: 1 }}>
                    {Options.map((option, i) => (
                        <NavLink
                            href={option.href}
                            key={i}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                            //  ref={i === customers.length - 1 ? ref : null}
                        >
                            {isActive => (
                                <ListItem>
                                    <ListItemButton selected={isActive} variant='sidebarIconButton'>
                                        <ListItemIcon>
                                            {React.createElement(option.icon)}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    ))}
                </List>

                <IconButton
                    onClick={openMenu}
                    sx={{
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: 'primary.main',
                        p: '3px',
                    }}>
                    <Avatar
                        alt={user?.user.name}
                        src={user?.user.picture}
                        sx={{ width: 30, height: 30 }}
                    />
                </IconButton>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    bottom: 0,
                    transform: 'translateY(-20px)',
                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                        width: 'min(100%, 348px)',
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        borderRadius: '8px',
                        p: 0.2,
                        overflowY: 'unset',
                        color: 'contrastColor',
                    },
                    // '& .MuiButtonBase-root:hover': {
                    //     bgcolor: '#f5f5f5',
                    // },
                }}>
                <MenuItem
                    sx={{ pl: 1.5, py: 2 }}
                    onClick={() => {
                        closeMenu();
                        openModal();
                    }}>
                    <ListItemIcon sx={{ pr: 1.4 }}>
                        <Avatar
                            alt={user?.user.name}
                            src={user?.user.picture}
                            sx={{ width: 40, height: 40 }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={user?.user.name}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                        secondary={user?.user.email}
                    />
                </MenuItem>
                <Divider variant='fullWidth' />
                <MenuItem
                    onClick={() => {
                        closeMenu();
                        openModal();
                    }}>
                    <ListItemIcon>
                        <IoIosSettings size={20} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}>
                        Preference
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        closeMenu();
                        logout();
                    }}>
                    <ListItemIcon>
                        <MdLogout size={20} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}>
                        Log Out
                    </ListItemText>
                </MenuItem>
            </Menu>

            <Modal
                open={modalState}
                onClose={closeModal}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <>
                    <Settings />
                </>
            </Modal>
        </>
    );
};

export default Index;

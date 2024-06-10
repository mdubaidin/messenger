'use client';

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
    IconButton,
    Avatar,
    ListItemAvatar,
    ListItemIcon,
    MenuItem,
    Menu,
    Modal,
} from '@mui/material';
import React from 'react';
import NavLink from '@/components/NavLink';
import { generateDate } from '@/utils/function';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SettingsIcon from '@mui/icons-material/Settings';
import { Contacts, Options } from '@/data/sidebar';
import SearchBar from '@/components/SearchBar';
import { PiNotePencil } from 'react-icons/pi';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMenu } from '@/hooks/useMenu';
import useModal from '@/hooks/useModal';
import Settings from './Settings';
import { deleteCookie } from 'cookies-next';

const Sidebar = () => {
    const { anchorEl, openMenu, closeMenu } = useMenu();
    const { modalState, openModal, closeModal } = useModal();

    const signOut = () => {
        deleteCookie('accessToken');
    };

    return (
        <>
            <Box minHeight='100dvh' color='text.secondary' display='flex'>
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
                                // ref={i === customers.length - 1 ? ref : null}
                            >
                                {isActive => (
                                    <ListItem>
                                        <ListItemButton
                                            selected={isActive}
                                            variant='sidebarIconButton'>
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
                            alt='Remy Sharp'
                            src='data:image/jpeg;base64,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'
                            sx={{ width: 30, height: 30 }}
                        />
                    </IconButton>
                </Box>
                <Box display='flex' flexDirection='column' flexGrow={1}>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{ textDecoration: 'none', color: 'text.primary', py: 1.5 }}>
                        <Stack direction='row' alignItems='center'>
                            <Typography variant='h6' fontSize={20} fontWeight='600' pl={1}>
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

                    <Box
                        sx={{
                            overflowY: 'auto',
                            height: 'calc(100% - 152px)',
                            flexGrow: 1,
                            pb: 2,
                        }}>
                        <List sx={{ px: 0.3 }}>
                            {Contacts.map((contact, i) => (
                                <NavLink
                                    href={`/c/${contact.id}`}
                                    key={i}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                    // ref={i === customers.length - 1 ? ref : null}
                                >
                                    {isActive => (
                                        <ListItem sx={{ p: 0.5 }}>
                                            <ListItemButton
                                                selected={isActive}
                                                variant={'sidebarButton'}
                                                sx={{ minHeight: 70 }}
                                                // onClick={() => dispatch(setCustomer(customer))}
                                            >
                                                <Typography
                                                    variant='caption'
                                                    color='currentcolor'
                                                    fontSize={11}
                                                    position='absolute'
                                                    top='8px'
                                                    right='8px'>
                                                    {contact.time
                                                        ? generateDate(contact.time)
                                                        : null}
                                                </Typography>
                                                {contact.unreadMessage && (
                                                    <FiberManualRecordIcon
                                                        color='primary'
                                                        sx={{
                                                            fontSize: 14,
                                                            position: 'absolute',
                                                            bottom: '18px',
                                                            right: '8px',
                                                        }}
                                                    />
                                                )}

                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={
                                                            contact.firstName +
                                                            ' ' +
                                                            contact.lastName
                                                        }
                                                        src={contact.avatar}
                                                        sx={{ width: '45px', height: '45px' }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Typography
                                                        variant='subtitle1'
                                                        fontWeight='500'
                                                        color='contrastColor'
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}>
                                                        {contact.firstName + ' ' + contact.lastName}
                                                    </Typography>

                                                    <Typography
                                                        variant='body2'
                                                        color='text.secondary'
                                                        sx={{
                                                            fontSize: 13,
                                                            overflow: 'hidden',
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: '1',
                                                            textOverflow: 'ellipsis',
                                                        }}>
                                                        {contact.message || 'No message'}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                </NavLink>
                            ))}
                        </List>
                    </Box>
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
                        onClick={() => {
                            closeMenu();
                            openModal();
                        }}>
                        <ListItemIcon>
                            <SettingsIcon fontSize='small' sx={{ color: 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}>
                            Preference
                        </ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            closeMenu();
                            signOut();
                        }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize='small' sx={{ color: 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}>
                            Log Out
                        </ListItemText>
                    </MenuItem>
                </Menu>
            </Box>

            <Modal
                open={modalState}
                onClose={closeModal}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings />
            </Modal>
        </>
    );
};

export default Sidebar;

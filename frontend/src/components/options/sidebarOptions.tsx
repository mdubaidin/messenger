'use client';

import React, { Fragment } from 'react';
import {
    ListItemText,
    Avatar,
    ListItemIcon,
    MenuItem,
    Menu,
    Divider,
    Modal as MuiModal,
    IconButton,
    List,
    ListItem,
    ListItemButton,
} from '@mui/material';

// Icons
import { MdLogout } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import useMenu from '@/hooks/useMenu';
import { CookieUser } from '@/types/types';
import { logout } from '@/actions/auth';
import { Options } from '@/data/sidebar';
import useModal from '@/hooks/useModal';
import Settings from '@/components/options/settings';
import NavLink from '../lib/navLink';

type OptionsProps = {
    anchorEl: HTMLElement | null;
    closeMenu: () => void;
    user: CookieUser | null;
};

type ModalProps = {
    modalState: boolean;
    closeModal: () => void;
};

type SidebarOptionsProps = {
    user: CookieUser | null;
};

function SidebarOptions(props: SidebarOptionsProps) {
    const { anchorEl, openMenu, closeMenu } = useMenu();
    const { user } = props;

    return (
        <Fragment>
            <List disablePadding sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {Options.map((option, i) => (
                    <NavLink
                        href={option.href}
                        key={i}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}>
                        {isActive => (
                            <ListItem disablePadding>
                                <ListItemButton selected={isActive} variant='sidebarIconButton'>
                                    <ListItemIcon>{React.createElement(option.icon)}</ListItemIcon>
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
                <Avatar alt={user?.name} src={user?.picture} sx={{ width: 30, height: 30 }} />
            </IconButton>
            <OptionMenu anchorEl={anchorEl} closeMenu={closeMenu} user={user} />
        </Fragment>
    );
}

function OptionMenu(props: OptionsProps) {
    const { anchorEl, closeMenu, user } = props;
    const { modalState, openModal, closeModal } = useModal();

    return (
        <Fragment>
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
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
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
                        <Avatar alt={user?.name} src={user?.picture} sx={{ width: 40, height: 40 }} />
                    </ListItemIcon>
                    <ListItemText primary={user?.name} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} secondary={user?.email} />
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
                    <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}>Preference</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        closeMenu();
                        logout();
                    }}>
                    <ListItemIcon>
                        <MdLogout size={20} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}>Log Out</ListItemText>
                </MenuItem>
            </Menu>

            <Modal modalState={modalState} closeModal={closeModal} />
        </Fragment>
    );
}

function Modal(props: ModalProps) {
    const { modalState, closeModal } = props;

    return (
        <MuiModal open={modalState} onClose={closeModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings />
        </MuiModal>
    );
}

export default SidebarOptions;

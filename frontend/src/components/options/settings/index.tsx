'use client';

import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ActiveStatus from './activeStatus';
import Notifications from './notifications';
import Appearance from './appearance';
import Language from './language';
import Privacy from './privacy';
import { getCookie } from 'cookies-next';

// Icons
import { MdLogout, MdManageAccounts, MdDarkMode, MdMarkChatUnread, MdGppGood } from 'react-icons/md';
import { IoIosWarning, IoIosNotifications, IoMdGlobe } from 'react-icons/io';
import { SettingOption } from '@/types/types';

const Preferences: SettingOption[] = [
    {
        name: 'Active status',
        icon: <MdMarkChatUnread size={20} style={{ color: 'white' }} />,
        background: '#31cc46',
        component: ActiveStatus,
        setting: 'On',
    },
    {
        name: 'Notifications',
        icon: <IoIosNotifications size={20} style={{ color: 'white' }} />,
        background: '#a033ff',
        component: Notifications,
        setting: 'On',
    },
    {
        name: 'Appearance',
        icon: <MdDarkMode size={20} style={{ color: 'white' }} />,
        background: '#1e2227',
        component: Appearance,
        setting: getCookie('P13N'),
    },
    {
        name: 'Language',
        icon: <IoMdGlobe size={20} style={{ color: 'white' }} />,
        background: '#0a7cff',
        component: Language,
        setting: 'English',
    },
    {
        name: 'Privacy & safety',
        icon: <MdGppGood size={20} style={{ color: 'white' }} />,
        background: '#0a7cff',
        component: Privacy,
        setting: 'On',
    },
];

const Account: SettingOption[] = [
    {
        name: 'Account settings',
        icon: <MdManageAccounts size={20} style={{ color: 'white' }} />,
        background: '#19baff',
        component: ActiveStatus,
        setting: 'On',
    },
    {
        name: 'Report a problem',
        icon: <IoIosWarning size={20} style={{ color: 'white' }} />,
        background: '#ff7057',
        component: Notifications,
        setting: 'On',
    },
    {
        name: 'Log Out',
        icon: <MdLogout size={20} style={{ color: 'white' }} />,
        background: '#a033ff',
        component: Appearance,
        setting: 'On',
    },
];

const Index = () => {
    const [option, setOption] = useState<SettingOption>(Preferences[0]);

    return (
        <Box
            sx={{
                width: 'min(100%, 710px)',
                maxHeight: '80vh',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                bgcolor: 'background.default',
                border: '1px solid',
                borderRadius: '8px',
                borderColor: 'divider',
                p: 1.4,
                overflow: 'auto',
            }}>
            <Stack direction='row'>
                <Stack sx={{ overflowY: 'auto', height: '100%', minWidth: '280px' }}>
                    <Typography variant='subtitle2' color='text.secondary' gutterBottom>
                        Preferences
                    </Typography>

                    <List sx={{ p: 0, m: 0 }}>
                        {Preferences.map(setting => (
                            <ListItem key={setting.name} sx={{ p: 0 }}>
                                <ListItemButton
                                    selected={setting.name === option.name}
                                    onClick={() => setOption(setting)}
                                    sx={{
                                        py: 0.4,
                                        px: 1,
                                        '&:hover': { background: 'transparent' },
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            width: '36px',
                                            height: '36px',
                                            marginRight: 2,
                                            borderRadius: '500px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: setting.background,
                                        }}>
                                        {setting.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={setting.name} secondary={setting.setting} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant='subtitle2' color='text.secondary' my={1}>
                        Account & support
                    </Typography>

                    <List sx={{ p: 0, m: 0 }}>
                        {Account.map(setting => (
                            <ListItem key={setting.name} sx={{ p: 0 }}>
                                <ListItemButton
                                    selected={setting.name === option.name}
                                    onClick={() => setOption(setting)}
                                    sx={{
                                        py: 0.4,
                                        px: 1,
                                        '&:hover': { background: 'transparent' },
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            width: '36px',
                                            height: '36px',
                                            marginRight: 2,
                                            borderRadius: '500px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: setting.background,
                                        }}>
                                        {setting.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={setting.name} secondary={'On'} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Stack>

                <Divider flexItem orientation='vertical' sx={{ height: '100%', borderColor: 'text.secondary', mr: 2 }} />

                {React.createElement(option.component, { name: option.name })}
            </Stack>
        </Box>
    );
};

export default Index;

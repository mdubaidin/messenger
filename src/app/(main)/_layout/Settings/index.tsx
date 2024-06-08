import {
    Box,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PublicIcon from '@mui/icons-material/Public';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LogoutIcon from '@mui/icons-material/Logout';
import WarningIcon from '@mui/icons-material/Warning';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import React, { useState } from 'react';
import ActiveStatus from './ActiveStatus';
import Notifications from './Notifications';
import Appearance from './Appearance';
import Language from './Language';
import Privacy from './Privacy';
import { getCookie } from 'cookies-next';

export type OptionType = {
    name: string;
    icon: React.ReactNode;
    background: string;
    component: React.ElementType;
    setting: string | undefined;
};

const Preferences: OptionType[] = [
    {
        name: 'Active status',
        icon: <MarkChatUnreadIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#31cc46',
        component: ActiveStatus,
        setting: 'On',
    },
    {
        name: 'Notifications',
        icon: <NotificationsIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#a033ff',
        component: Notifications,
        setting: 'On',
    },
    {
        name: 'Appearance',
        icon: <DarkModeIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#1e2227',
        component: Appearance,
        setting: getCookie('P13N'),
    },
    {
        name: 'Language',
        icon: <PublicIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#0a7cff',
        component: Language,
        setting: 'English',
    },
    {
        name: 'Privacy & safety',
        icon: <GppGoodIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#0a7cff',
        component: Privacy,
        setting: 'On',
    },
];

const Account: OptionType[] = [
    {
        name: 'Account settings',
        icon: <ManageAccountsIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#19baff',
        component: ActiveStatus,
        setting: 'On',
    },
    {
        name: 'Report a problem',
        icon: <WarningIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#ff7057',
        component: Notifications,
        setting: 'On',
    },
    {
        name: 'Log Out',
        icon: <LogoutIcon fontSize='small' sx={{ color: 'white' }} />,
        background: '#a033ff',
        component: Appearance,
        setting: 'On',
    },
];

const Index = () => {
    const [option, setOption] = useState<OptionType>(Preferences[0]);

    return (
        <Box
            sx={{
                width: 'min(100%, 710px)',
                maxHeight: '80vh',
                boxShadow:
                    'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
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
                                    <ListItemText
                                        primary={setting.name}
                                        secondary={setting.setting}
                                    />
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

                <Divider
                    flexItem
                    orientation='vertical'
                    sx={{ height: '100%', borderColor: 'text.secondary', mr: 2 }}
                />

                {React.createElement(option.component, { name: option.name })}
            </Stack>
        </Box>
    );
};

export default Index;

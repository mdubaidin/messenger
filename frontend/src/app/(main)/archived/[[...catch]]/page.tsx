'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import SearchBar from '@/components/SearchBar';
import NavLink from '@/components/NavLink';
import useErrorHandler from '@/hooks/useErrorHandler';
import { Contact, setContact } from '@/redux/features/contact/contactSlice';
import { useAppDispatch } from '@/redux/hook';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';

// Icons
import { PiNotePencil } from 'react-icons/pi';
import { MdFiberManualRecord } from 'react-icons/md';
import { generateDate } from '@/utils/function';

export default function Chats() {
    const errorHandler = useErrorHandler();
    const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
    const dispatch = useAppDispatch();
    const { status } = useSession();

    // const getContacts = useCallback(async () => {
    //     try {
    //         const { data } = await axios.get('/users');
    //         setActiveContacts(data.users);
    //     } catch (err) {
    //         errorHandler(err);
    //     }
    // }, [errorHandler]);

    // useEffect(() => {
    //     if (status == 'authenticated') {
    //         getContacts();
    //     }
    // }, [status, getContacts]);

    return (
        <Box display='flex' flexDirection='column' flexGrow={1} px={1}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                sx={{ textDecoration: 'none', color: 'text.primary', py: 1.5 }}>
                <Typography variant='h6' fontSize={24} fontWeight='600' py={0.5}>
                    Archived chats
                </Typography>
            </Box>

            <Box mt={1}>
                <Typography variant='body2' fontSize={14} py={0.5}>
                    No messages found
                </Typography>
            </Box>

            <Box
                sx={{
                    overflowY: 'auto',
                    height: 'calc(100% - 152px)',
                    flexGrow: 1,
                    pb: 2,
                }}>
                <List sx={{ px: 0.3 }}>
                    {activeContacts.map((contact, i) => (
                        <NavLink
                            href={`/active/${contact._id}`}
                            key={i}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                            //   ref={i === customers.length - 1 ? ref : null}
                        >
                            {isActive => (
                                <ListItem sx={{ p: 0.5 }}>
                                    <ListItemButton
                                        selected={isActive}
                                        variant={'sidebarButton'}
                                        sx={{ minHeight: 70 }}
                                        onClick={() => dispatch(setContact(contact))}>
                                        <Typography
                                            variant='caption'
                                            color='currentcolor'
                                            fontSize={11}
                                            position='absolute'
                                            top='8px'
                                            right='8px'>
                                            {contact.time ? generateDate(contact.time) : null}
                                        </Typography>
                                        {contact.unreadMessage && (
                                            <MdFiberManualRecord
                                                color='primary'
                                                style={{
                                                    fontSize: 14,
                                                    position: 'absolute',
                                                    bottom: '18px',
                                                    right: '8px',
                                                }}
                                            />
                                        )}

                                        <ListItemAvatar>
                                            <Avatar
                                                alt={contact.name}
                                                src={contact.picture}
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
                                                {contact.name}
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
    );
}

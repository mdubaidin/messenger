'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import NavLink from '@/components/NavLink';
import useErrorHandler from '@/hooks/useErrorHandler';
import { Chat, setChat } from '@/redux/features/contact/contactSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import axios from 'axios';

// Icons
import { MdFiberManualRecord } from 'react-icons/md';
import { generateDate } from '@/utils/function';

export default function AllChats() {
    const errorHandler = useErrorHandler();
    const [chats, setChats] = useState<Chat[]>([]);
    const dispatch = useAppDispatch();
    const selectedChat = useAppSelector(state => state.chat.chat);

    const getChats = useCallback(async () => {
        try {
            const { data } = await axios.get('/chats/all', {
                params: { sortBy: 'updatedAt', direction: -1 },
            });
            setChats(data.chats);
        } catch (err) {
            errorHandler(err);
        }
    }, [errorHandler]);

    useEffect(() => {
        getChats();
    }, []);

    return (
        <Box
            sx={{
                overflowY: 'auto',
                height: 'calc(100% - 152px)',
                flexGrow: 1,
                pb: 2,
            }}>
            <List sx={{ px: 0.3 }}>
                {chats.map((chat, i) => (
                    <ListItem sx={{ p: 0.5 }}>
                        <ListItemButton
                            selected={selectedChat ? selectedChat._id === chat._id : false}
                            variant={'sidebarButton'}
                            sx={{ minHeight: 70 }}
                            onClick={() => dispatch(setChat(chat))}>
                            <Typography
                                variant='caption'
                                color='currentcolor'
                                fontSize={11}
                                position='absolute'
                                top='8px'
                                right='8px'>
                                {chat.time ? generateDate(chat.time) : null}
                            </Typography>
                            {chat.unreadMessage && (
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
                                    alt={chat.name}
                                    src={chat.picture}
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
                                    {chat.name}
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
                                    {chat.message || 'No message'}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

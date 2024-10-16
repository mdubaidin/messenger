'use client';

import React from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { setChat } from '@/store/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

// Icons
import { MdFiberManualRecord } from 'react-icons/md';
import { generateDate } from '@/utils/function';
import { useGetChatListQuery } from '@/api/chats/client';
import { Chat } from '@/types/types';

export default function AllChats() {
    const { data } = useGetChatListQuery();
    const dispatch = useAppDispatch();
    const selectedChat = useAppSelector(state => state.chat.chat);

    console.log({ data });

    return (
        <Box
            sx={{
                overflowY: 'auto',
                height: 'calc(100% - 152px)',
                flexGrow: 1,
                pb: 2,
            }}>
            <List sx={{ px: 0.3 }}>
                {data?.data.map(chat => (
                    <ListItem sx={{ p: 0.5 }}>
                        <ListItemButton
                            selected={selectedChat ? selectedChat._id === chat._id : false}
                            variant={'sidebarButton'}
                            sx={{ minHeight: 70 }}
                            onClick={() => dispatch(setChat(chat))}>
                            <Typography variant='caption' color='currentcolor' fontSize={11} position='absolute' top='8px' right='8px'>
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
                                <Avatar alt={chat.name} src={chat.picture} sx={{ width: '45px', height: '45px' }} />
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

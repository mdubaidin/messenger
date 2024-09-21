import { useAppSelector } from '@/redux/hook';
import { Avatar, Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Icons
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { MdBlock } from 'react-icons/md';
import { FileIcon, LinkIcon, MediaIcon } from '@/components/Icons';
import axios from 'axios';
import useErrorHandler from '@/hooks/useErrorHandler';
import { Key } from './Main';

type ChatProps = {
    chatInfo: any | null;
    setComponent: Dispatch<SetStateAction<Key>>;
};

const Details = (props: ChatProps) => {
    const { chatInfo, setComponent } = props;

    return chatInfo ? (
        <Box height={'100%'} p={2.5}>
            <Stack alignItems='center' justifyContent='center' py={4} textAlign='center'>
                <Avatar
                    alt={chatInfo.name}
                    src={chatInfo.picture}
                    sx={{ width: 100, height: 100, mb: 1.5 }}
                />
                <Typography
                    variant='h6'
                    lineHeight={1.2}
                    fontWeight={500}
                    gutterBottom
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '1',
                    }}>
                    {chatInfo.name}
                </Typography>
                <Typography
                    variant='subtitle2'
                    color='text.tertiary'
                    fontWeight={500}
                    gutterBottom
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '1',
                    }}>
                    {chatInfo.username}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {chatInfo.bio}
                </Typography>
            </Stack>

            <Stack direction='row' spacing={1} mb={4}>
                <Button
                    variant='contained'
                    fullWidth
                    startIcon={<IoSearchOutline />}
                    sx={{ py: 1, borderRadius: 2.5 }}
                    onClick={() => setComponent('search')}>
                    Search
                </Button>
                <Button
                    variant='outlined'
                    fullWidth
                    startIcon={<IoIosNotifications />}
                    sx={{ py: 1, borderRadius: 2.5 }}>
                    Mute
                </Button>
            </Stack>
            <Typography
                variant='subtitle1'
                color='text.tertiary'
                fontWeight={600}
                sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '1',
                    mb: 1.5,
                }}>
                Latest Attachements
            </Typography>

            <Button
                variant='text'
                fullWidth
                startIcon={<MediaIcon />}
                onClick={() => setComponent('media')}
                sx={{
                    color: 'text.secondary',
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                }}>
                Media
            </Button>
            <Button
                variant='text'
                fullWidth
                startIcon={<LinkIcon />}
                onClick={() => setComponent('links')}
                sx={{
                    color: 'text.secondary',
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                }}>
                Links
            </Button>
            <Button
                variant='text'
                fullWidth
                startIcon={<FileIcon />}
                onClick={() => setComponent('docs')}
                sx={{
                    color: 'text.secondary',
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                }}>
                Docs
            </Button>

            <Typography
                variant='subtitle1'
                color='text.tertiary'
                fontWeight={600}
                sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '1',
                    mt: 2,
                    mb: 1.5,
                }}>
                Attachements Images
            </Typography>

            <Divider sx={{ mb: 1 }} />
            <Button
                variant='text'
                fullWidth
                startIcon={<MdBlock />}
                color='error'
                sx={{
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                    mb: 0.5,
                }}>
                Block {chatInfo.name}
            </Button>
        </Box>
    ) : null;
};

export default Details;

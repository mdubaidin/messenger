import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

// Icons
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { MdBlock } from 'react-icons/md';
import { FileIcon, LinkIcon, MediaIcon } from '@/components/lib/icons';
import { Key } from './Main';
import { useChatDetails } from '@/api/chats/client';
import { FailedToLoad } from '@/components/lib/notFound';
import { useAppSelector } from '@/store/hook';

type ChatProps = {
    setComponent: Dispatch<SetStateAction<Key>>;
};

const Details = (props: ChatProps) => {
    const { setComponent } = props;

    const chat = useAppSelector(state => state.chat.chat);

    if (!chat?._id) return null;

    const { data } = useChatDetails(chat._id);

    if (!data?.data) return <FailedToLoad />;

    return (
        <Box height={'100%'} p={2.5}>
            <Stack alignItems='center' justifyContent='center' py={4} textAlign='center'>
                <Avatar alt={data.data.name} src={data.data.picture} sx={{ width: 100, height: 100, mb: 1.5 }} />
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
                    {data.data.name}
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
                    {data.data.username}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {data.data.bio}
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
                <Button variant='outlined' fullWidth startIcon={<IoIosNotifications />} sx={{ py: 1, borderRadius: 2.5 }}>
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
                Block {data.data.name}
            </Button>
        </Box>
    );
};

export default Details;

import { useAppSelector } from '@/redux/hook';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

// Icons
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { FileIcon, LinkIcon, MediaIcon } from '@/components/Icons';

const ContactPanel = () => {
    const contact = useAppSelector(state => state.contact.contact);

    return (
        <Box height={'100%'} p={3}>
            <Stack alignItems='center' justifyContent='center' py={3}>
                <Avatar
                    alt={contact.name}
                    src={contact.picture}
                    sx={{ width: 100, height: 100, mb: 1.5 }}
                />
                <Typography
                    variant='h6'
                    lineHeight={1.2}
                    fontWeight={500}
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '1',
                    }}>
                    {contact.name}
                </Typography>
                <Typography
                    variant='body2'
                    color='text.secondary'
                    fontSize={14}
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '1',
                    }}>
                    {contact.email}
                </Typography>
            </Stack>
            <Stack direction='row' spacing={1} mb={4}>
                <Button
                    variant='contained'
                    fullWidth
                    startIcon={<IoSearchOutline />}
                    sx={{ py: 1, borderRadius: 2.5 }}>
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
                sx={{
                    color: 'text.secondary',
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                }}>
                Files
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
        </Box>
    );
};

export default ContactPanel;

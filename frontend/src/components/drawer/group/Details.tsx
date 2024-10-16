import { useAppSelector } from '@/store/hook';
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

// Icons
import { IoSearchOutline, IoExitOutline } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { MdPersonAdd, MdBlock } from 'react-icons/md';
import { FileIcon, LinkIcon, MediaIcon } from '@/components/lib/icons';
import { Key } from './Main';
import useModal from '@/hooks/useModal';
import AddMember from './AddMember';
import { Group } from '@/types/types';
import { useGroupDetails } from '@/api/groups/client';
import { FailedToLoad } from '@/components/lib/notFound';

type DetailsProps = {
    setComponent: Dispatch<SetStateAction<Key>>;
};

const Details = (props: DetailsProps) => {
    const { setComponent } = props;
    const chat = useAppSelector(state => state.chat.chat);
    if (!chat?._id) return null;

    const { modalState, openModal, closeModal } = useModal();

    const { data } = useGroupDetails(chat._id);
    if (!data?.data) return <FailedToLoad />;

    const { group, members } = data.data;

    return (
        <Box p={2.5}>
            <Stack alignItems='center' justifyContent='center' py={4} textAlign='center'>
                <Avatar alt={group.name} src={group.picture} sx={{ width: 100, height: 100, mb: 1.5 }} />
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
                    {group.name}
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
                    Group · {members.length} members
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {group.description}
                </Typography>
            </Stack>

            <Stack direction='row' spacing={1} mb={4}>
                <Button
                    variant='contained'
                    fullWidth
                    startIcon={<IoSearchOutline />}
                    sx={{ py: 1, borderRadius: 2.5 }}
                    onClick={() => {
                        setComponent('search');
                    }}>
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

            <Stack direction='row' justifyContent='space-between' alignItems='center' my={0.5}>
                <Typography
                    variant='subtitle1'
                    color='text.tertiary'
                    fontWeight={600}
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '1',
                    }}>
                    Members
                </Typography>
                <IconButton color='primary' onClick={() => setComponent('searchMembers')}>
                    <IoSearchOutline />
                </IconButton>
            </Stack>

            <List sx={{ mx: -0.5 }}>
                <ListItem disablePadding>
                    <ListItemButton variant={'memberButton'} sx={{ minHeight: 60 }} onClick={openModal}>
                        <ListItemAvatar>
                            <Avatar
                                alt={'Add Member'}
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: 'primary.main',
                                }}>
                                <MdPersonAdd size={22} color='white' />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <Typography
                                variant='subtitle1'
                                color='contrastColor'
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                Add Member
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                {members &&
                    members.map((member: any) => (
                        <ListItem
                            disablePadding
                            sx={{ '& .MuiListItemSecondaryAction-root': { top: '29%' } }}
                            secondaryAction={
                                member.admin && (
                                    <Chip
                                        label='Group admin'
                                        size='small'
                                        sx={{
                                            borderRadius: 1,
                                            height: 20,
                                            alignItems: 'start',
                                            '& .MuiChip-label': {
                                                px: 0.8,
                                                fontSize: 12,
                                            },
                                        }}
                                    />
                                )
                            }>
                            <ListItemButton variant={'memberButton'}>
                                <ListItemAvatar>
                                    <Avatar alt={member.user.name} src={member.user.picture} sx={{ width: '40px', height: '40px' }} />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography
                                        variant='body2'
                                        color='contrastColor'
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                        {member.user.name}
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
                                        {member.user.bio || member.user.username}
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>

            <Button
                variant='text'
                fullWidth
                color='success'
                onClick={() => setComponent('searchMembers')}
                sx={{
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                    mb: 0.5,
                }}>
                View all
            </Button>
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
                Block group
            </Button>
            <Button
                variant='text'
                fullWidth
                startIcon={<IoExitOutline />}
                color='error'
                sx={{
                    justifyContent: 'flex-start',
                    borderRadius: 1.5,
                    pl: 1.5,
                    mb: 0.5,
                }}>
                Exit group
            </Button>

            <Modal open={modalState} onClose={closeModal} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AddMember closeModal={closeModal} />
            </Modal>
        </Box>
    );
};

export default Details;

import { useAppSelector } from '@/redux/hook';
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
    Stack,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// Icons
import { IoSearchOutline, IoExitOutline } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { MdPersonAdd, MdBlock } from 'react-icons/md';
import { FileIcon, LinkIcon, MediaIcon } from '@/components/Icons';
import axios from 'axios';
import useErrorHandler from '@/hooks/useErrorHandler';

type GroupInfoProps = {
    groupId: string;
};

const GroupInfo = (props: GroupInfoProps) => {
    const { groupId } = props;
    const [info, setInfo] = useState<any>(null);
    const [members, setMembers] = useState<any>([]);
    const errorHandler = useErrorHandler();

    const getGroupInfo = async (id: string) => {
        try {
            const response = await axios.get(`/groups/${id}`);

            setInfo(response.data.group);
            setMembers(response.data.members);
        } catch (error) {
            errorHandler(error);
        }
    };

    console.log({ data: info });

    useEffect(() => {
        if (!groupId) return;

        getGroupInfo(groupId);
    }, [groupId]);

    return info ? (
        <Box p={2.5}>
            <Stack alignItems='center' justifyContent='center' py={4} textAlign='center'>
                <Avatar
                    alt={info.name}
                    src={info.picture}
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
                    {info.name}
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
                    {info.description}
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
                <IconButton color='primary'>
                    <IoSearchOutline />
                </IconButton>
            </Stack>

            <List sx={{ mx: -0.5 }}>
                <ListItem disablePadding>
                    <ListItemButton variant={'memberButton'} sx={{ minHeight: 60 }}>
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
                                    <Avatar
                                        alt={member.user.name}
                                        src={member.user.picture}
                                        sx={{ width: '40px', height: '40px' }}
                                    />
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
        </Box>
    ) : null;
};

export default GroupInfo;

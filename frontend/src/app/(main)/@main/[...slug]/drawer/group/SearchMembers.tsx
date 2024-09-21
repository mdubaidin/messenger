import {
    Avatar,
    Chip,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';

// Icons
import axios from 'axios';
import useErrorHandler from '@/hooks/useErrorHandler';
import { Key } from './Main';
import SearchBar from '@/components/SearchBar';
import { IoClose } from 'react-icons/io5';

type SearchProps = {
    groupInfo: any | null;
    members: any | null;
    setComponent: Dispatch<SetStateAction<Key>>;
};

const SearchMembers = (props: SearchProps) => {
    const { members, setComponent } = props;
    const [chats, setChats] = useState<any>(null);
    const errorHandler = useErrorHandler();

    const getChatInfo = async (id: string) => {
        try {
            const response = await axios.get(`/chats/${id}`);

            setChats(response.data.chat);
        } catch (error) {
            errorHandler(error);
        }
    };

    // useEffect(() => {
    //     if (!chatId) return;

    //     getChatInfo(chatId);
    // }, [chatId]);

    return (
        <Fragment>
            <Stack direction='row' spacing={0.5} alignItems='center' py={1.6} mx={0.5}>
                <IconButton onClick={() => setComponent('details')}>
                    <IoClose />
                </IconButton>

                <Typography variant='subtitle1' fontSize={17}>
                    Search members
                </Typography>
            </Stack>

            <Stack direction='row' px={1.5}>
                <SearchBar />
            </Stack>

            {members ? (
                <List sx={{ p: 1.5 }}>
                    {members.map((member: any) => (
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
            ) : (
                <Typography variant='subtitle1' color='text.secondary' my={5} textAlign='center'>
                    Search group members
                </Typography>
            )}
        </Fragment>
    );
};

export default SearchMembers;

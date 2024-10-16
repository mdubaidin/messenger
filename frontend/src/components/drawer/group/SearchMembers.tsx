import { Avatar, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import React, { Dispatch, Fragment, SetStateAction } from 'react';

// Icons
import { Key } from './Main';
import SearchBar from '@/components/lib/searchbar';
import { IoClose } from 'react-icons/io5';
import { useAppSelector } from '@/store/hook';
import { useGroupMembers } from '@/api/groups/client';
import { FailedToLoad } from '@/components/lib/notFound';

type SearchProps = {
    setComponent: Dispatch<SetStateAction<Key>>;
};

const SearchMembers = (props: SearchProps) => {
    const { setComponent } = props;
    const chat = useAppSelector(state => state.chat.chat);

    if (!chat?._id) return null;

    const { data } = useGroupMembers(chat._id);

    if (!data?.data) return <FailedToLoad />;

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

            <List sx={{ p: 1.5 }}>
                {data.data.map(member => (
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
                                <Avatar alt={member.name} src={member.picture} sx={{ width: '40px', height: '40px' }} />
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
                                    {member.name}
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
                                    {member.bio || member.username}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
};

export default SearchMembers;

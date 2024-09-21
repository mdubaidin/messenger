import SearchBar from '@/components/SearchBar';
import {
    Avatar,
    Box,
    Card,
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
import React from 'react';
import { IoClose } from 'react-icons/io5';

type AddMemberProps = {
    closeModal: () => void;
};

const AddMember = (props: AddMemberProps) => {
    const { closeModal } = props;

    return (
        <Card
            sx={{
                width: 460,
                maxHeight: '80vh',
                borderRadius: 1.2,
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                p={1.5}
                bgcolor={'background.highlight'}>
                <IconButton onClick={closeModal}>
                    <IoClose />
                </IconButton>

                <Typography variant='h6' fontSize={17}>
                    Add Member
                </Typography>
            </Stack>
            <Divider variant='fullWidth' />
            <Box p={2}>
                <SearchBar />

                <Typography
                    variant='h6'
                    color='primary.main'
                    textTransform={'uppercase'}
                    fontWeight={400}
                    my={2}>
                    People
                </Typography>

                <List disablePadding sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <ListItem disablePadding>
                        <ListItemButton variant={'memberButton'}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={'alison parker'}
                                    // src={member.user.picture}
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
                                    Alison Parker
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
                                    Lorem ipsum dolor sit amet.
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Card>
    );
};

export default AddMember;

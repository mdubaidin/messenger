import {
    IconButton,
    List,
    ListItem,
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
    setComponent: Dispatch<SetStateAction<Key>>;
};

const Search = (props: SearchProps) => {
    const { groupInfo, setComponent } = props;
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
                    Search messages
                </Typography>
            </Stack>

            <Stack direction='row' px={1.5}>
                <SearchBar />
            </Stack>

            {true ? (
                <List sx={{ p: 1.5 }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText
                                primary='8/24/24'
                                secondary='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, eius.'
                                primaryTypographyProps={{ fontSize: 12 }}
                                secondaryTypographyProps={{
                                    sx: {
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '1',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            ) : (
                <Typography variant='subtitle1' color='text.secondary' my={5} textAlign='center'>
                    Search messages in {groupInfo.name} group
                </Typography>
            )}
        </Fragment>
    );
};

export default Search;

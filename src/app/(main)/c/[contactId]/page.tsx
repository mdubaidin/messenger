'use client';

import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import Avatar from '@/components/Avatar';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
// import Input from './Chat/Input';
// import Message from './Chat/Message';
import { useMenu } from '@/hooks/useMenu';
import SouthIcon from '@mui/icons-material/South';
import { isEmpty } from '@/utils/function';
// import { useInfiniteQuery, useQueries, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useIntersection } from '@mantine/hooks';
import { DateTime } from 'luxon';
// import eventEmitter from '@/utils/eventEmitter';
import useErrorHandler from '@/hooks/useErrorHandler';
// import { setContact } from '@/redux/features/contact/contactSlice';
import Picker from 'emoji-picker-react';
import useModal from '@/hooks/useModal';
import useLoader from '@/hooks/useLoader';
// import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

const Chat = ({ params }: { params: { slug: string } }) => {
    // const dispatch = useAppDispatch();
    const contact = useAppSelector(state => state.contact.contact);
    const { anchorEl: anchorElMore, openMenu: openMoreMenu, closeMenu: closeMoreMenu } = useMenu();
    const { anchorEl: anchorElCall, openMenu: openCallMenu, closeMenu: closeCallMenu } = useMenu();

    const {
        anchorEl: anchorElEmoji,
        openMenu: openEmojiMenu,
        closeMenu: closeEmojiMenu,
    } = useMenu();
    const {
        anchorEl: anchorElAction,
        openMenu: openActionMenu,
        closeMenu: closeActionMenu,
    } = useMenu();
    const {
        modalState: muteState,
        openModal: openMuteModal,
        closeModal: closeMuteModal,
    } = useModal();
    const {
        modalState: blockState,
        openModal: openBlockModal,
        closeModal: closeBlockModal,
    } = useModal();
    const { start: muteStart, end: muteEnd, circular: muteCircular } = useLoader();
    const { start: blockStart, end: blockEnd, circular: blockCircular } = useLoader();
    const [selectedMessage, setSelectedMessage] = useState({});
    const [searchOpen, setSearchOpen] = useState(false);
    const [textToSearch, setTextToSearch] = useState('');
    const [navigateOnSearch, setNavigateOnSearch] = useState({ id: 0, index: 0 });
    const [searchedData, setSearchedData] = useState({ ids: [], pages: [] });
    // const redirect = useSelector(state => state.message.redirect);
    const toggleSearch = () => setSearchOpen(!searchOpen);
    const [prevHeight, setPrevHeight] = useState(0);
    const containerRef = useRef(null);
    const messageRef = useRef({});
    const errorHandler = useErrorHandler();
    // const queryClient = useQueryClient();
    const [scrollArrow, setScrollArrow] = useState(false);
    const pageLoaded = useRef([]);

    // const { data, isError, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    //     queryKey: ['chat', conversation.id],
    //     queryFn: async ({ queryKey, pageParam }) => {
    //         const response = await axios.get('/messages/', {
    //             params: { conversation__id: queryKey[1], page: pageParam },
    //         });
    //         if (!pageLoaded.current.includes(pageParam))
    //             setPrevHeight(containerRef.current.scrollHeight);
    //         return response.data;
    //     },
    //     refetchInterval: 10000,
    //     initialPageParam: 1,
    //     getNextPageParam: prevData => {
    //         return prevData.next
    //             ? parseInt(prevData.next.substring(prevData.next.length - 1))
    //             : null;
    //     },
    //     getPreviousPageParam: prevData => {
    //         return prevData.previous
    //             ? parseInt(prevData.previous.substring(prevData.previous.length - 1))
    //             : null;
    //     },
    //     refetchOnWindowFocus: false,
    //     keepPreviousData: false,
    // });

    // const searchResults = useQueries({
    //     queries: searchedData.pages.map(page => ({
    //         queryKey: ['chat', conversation.id, page],
    //         queryFn: async ({ queryKey }) => {
    //             const response = await axios.get('/messages/', {
    //                 params: { conversation__id: queryKey[1], page: queryKey[2] },
    //             });
    //             return response.data.results;
    //         },
    //     })),
    //     combine: results => {
    //         const hasLoadedAll = results.every(result => result.data);

    //         return hasLoadedAll ? results.map(result => result.data) : [];
    //     },
    // });

    // const messageSearch = async () => {
    //     if (!textToSearch) return;
    //     try {
    //         const params = { search: textToSearch };

    //         const response = await axios.get('/messages/', { params });
    //         const results = response.data.results;
    //         setSearchedData({ ids: [], pages: [] });
    //         const pageSet = new Set();

    //         const searchIds = results.map(result => {
    //             pageSet.add(result.original_page);
    //             return result.id;
    //         });

    //         searchIds.reverse();
    //         const pages = Array.from(pageSet).toReversed();

    //         setSearchedData({ ids: searchIds, pages });
    //         setNavigateOnSearch({
    //             id: searchIds[searchIds.length - 1],
    //             index: searchIds.length - 1,
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const addReaction = useCallback(
    //     async emoji => {
    //         try {
    //             await axios.patch(`/messages/${selectedMessage.id}/`, {
    //                 reaction: emoji,
    //             });
    //             queryClient.invalidateQueries(['chat', selectedMessage.conversation]);
    //         } catch (err) {
    //             errorHandler(err);
    //         }
    //     },
    //     [errorHandler, selectedMessage, queryClient]
    // );

    // const addImportant = useCallback(
    //     async important => {
    //         try {
    //             await axios.patch(`/messages/${selectedMessage.id}/`, {
    //                 important,
    //             });
    //             queryClient.invalidateQueries(['chat', selectedMessage.conversation]);
    //             queryClient.invalidateQueries(['chat-important', selectedMessage.conversation]);
    //         } catch (err) {
    //             errorHandler(err);
    //         }
    //     },
    //     [errorHandler, selectedMessage, queryClient]
    // );

    // const muteCustomer = useCallback(async () => {
    //     muteStart();
    //     try {
    //         const response = await axios.patch(`/customers/${customer.id}/`, {
    //             muted: !customer.muted,
    //         });
    //         dispatch(setCustomer(response.data));
    //         queryClient.invalidateQueries({
    //             queryKey: ['customers'],
    //         });
    //     } catch (err) {
    //         errorHandler(err);
    //     } finally {
    //         muteEnd();
    //         closeMuteModal();
    //     }
    // }, [
    //     errorHandler,
    //     muteStart,
    //     muteEnd,
    //     customer.id,
    //     queryClient,
    //     customer.muted,
    //     dispatch,
    //     closeMuteModal,
    // ]);

    // const blockCustomer = useCallback(async () => {
    //     blockStart();
    //     try {
    //         const response = await axios.patch(`/customers/${customer.id}/`, {
    //             blocked: !customer.blocked,
    //         });
    //         dispatch(setCustomer(response.data));
    //         queryClient.invalidateQueries({
    //             queryKey: ['customers'],
    //         });
    //     } catch (err) {
    //         errorHandler(err);
    //     } finally {
    //         blockEnd();
    //         closeBlockModal();
    //     }
    // }, [
    //     errorHandler,
    //     blockStart,
    //     blockEnd,
    //     customer.id,
    //     queryClient,
    //     customer.blocked,
    //     dispatch,
    //     closeBlockModal,
    // ]);

    // const changeStatus = useCallback(async () => {
    //     try {
    //         await axios.post('/change-message-status/', {
    //             conversation_id: conversation.id,
    //             new_status: 'read',
    //         });
    //     } catch (e) {
    //         errorHandler(e);
    //     }
    // }, [errorHandler, conversation.id]);

    // const { entry, ref } = useIntersection({
    //     root: containerRef.current,
    //     threshold: 1,
    // });

    // const messages = useMemo(
    //     () =>
    //         searchResults.length
    //             ? searchResults.flatMap(page => page.toReversed())
    //             : data
    //             ? data.pages.flatMap(page => page.results).toReversed()
    //             : [],
    //     [searchResults, data]
    // );

    // const handleReaction = ({ emoji }) => {
    //     try {
    //         closeEmojiMenu();
    //         setSelectedMessage({ ...selectedMessage, reaction: emoji });

    //         queryClient.setQueryData(['chat', selectedMessage.conversation], prevData => {
    //             const { pages } = prevData;
    //             const data = pages.flatMap(page => page.results).reverse();
    //             data[selectedMessage.index].reaction = emoji;
    //             return { ...prevData };
    //         });
    //         if (selectedMessage.id) addReaction(emoji);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleImportant = important => {
    //     try {
    //         queryClient.setQueryData(['chat', selectedMessage.conversation], prevData => {
    //             const { pages } = prevData;
    //             const data = pages.flatMap(page => page.results).reverse();
    //             data[selectedMessage.index].important = important;
    //             return { ...prevData };
    //         });

    //         if (selectedMessage.id) addImportant(important);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleRedirect = useCallback(
    //     async redirect => {
    //         try {
    //             const isMessageLoaded = data.pageParams.includes(redirect.page);

    //             if (!isMessageLoaded) await fetchNextPage({ pageParam: redirect.page });

    //             if (isMessageLoaded) {
    //                 if (messageRef.current[redirect.id].current) {
    //                     messageRef.current[redirect.id].current?.scrollIntoView({
    //                         block: 'end',
    //                     });
    //                 }
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [data, fetchNextPage]
    // );

    // useEffect(() => {
    //     dispatch(setFetchNextPage(fetchNextPage));
    // }, [dispatch, fetchNextPage]);

    // useEffect(() => {
    //     try {
    //         if (navigateOnSearch.id) {
    //             if (messageRef.current[navigateOnSearch.id].current) {
    //                 messageRef.current[navigateOnSearch.id].current.scrollIntoView({
    //                     block: 'end',
    //                 });
    //             }
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [navigateOnSearch.id]);

    // useEffect(() => {
    //     if (redirect.id) handleRedirect(redirect);
    // }, [redirect, handleRedirect, data]);

    // useEffect(() => {
    //     if (conversation.has_unread_message) {
    //         const updatedConv = customer.conversation.map(conv => {
    //             if (conv.id === conversation.id)
    //                 return { ...conversation, has_message: false, has_unread_message: 0 };
    //             return conv;
    //         });
    //         dispatch(setCustomer({ ...customer, conversation: updatedConv }));
    //         changeStatus();
    //     }
    // }, [conversation, customer, dispatch, changeStatus]);

    // const scrollToBottom = () => {
    //     if (containerRef.current) {
    //         containerRef.current.scrollTo({ top: containerRef.current.scrollHeight });
    //         console.log('scrollToBottom');
    //     }
    // };

    // useEffect(() => {
    //     const currentHeight = containerRef.current.scrollHeight;
    //     const height = currentHeight - prevHeight;
    //     containerRef.current.scrollTo({
    //         top: height === 0 ? prevHeight : height,
    //     });
    // }, [prevHeight]);

    // useEffect(() => {
    //     eventEmitter.on('mutatingMessage', () => {
    //         scrollToBottom();
    //     });
    //     return () =>
    //         eventEmitter.removeListener('mutatingMessage', () => {
    //             scrollToBottom();
    //         });
    // }, []);

    // useEffect(() => {
    //     const pageParams = data?.pageParams;
    //     pageLoaded.current = pageParams || [];
    //     const element = document.getElementById('bottom');
    //     if (pageParams && pageParams[pageParams.length - 1] === 1)
    //         element.scrollTo({ top: element.scrollHeight });
    // }, [data]);

    // useEffect(() => {
    //     if (hasNextPage && entry?.isIntersecting && scrollArrow) {
    //         if (parseInt(prevConvId) === conversation.id) fetchNextPage();
    //     }
    // }, [hasNextPage, entry?.isIntersecting, fetchNextPage]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     scrollToBottom();
    // }, [conversation.id]);

    // if (isError) {
    //     return <h3>{error.message}</h3>;
    // }

    return (
        <Box height='100%' display='flex' flexDirection='column' position='relative'>
            <Box bgcolor='background.paper' borderBottom='1px solid' borderColor='divider'>
                <Grid container px={1} py={1.6} gap={1.5} alignItems='center'>
                    <Grid item>
                        <Avatar
                            alt='Remy Sharp'
                            src={contact.avatar}
                            sx={{
                                width: 45,
                                height: 45,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'common.white',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        {isEmpty(contact) ? (
                            <React.Fragment>
                                <Skeleton variant='text' width={140} height={16} />
                                <Skeleton variant='text' width={130} height={14} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography
                                    variant='body1'
                                    color='primary.main'
                                    lineHeight={1}
                                    fontWeight='500'
                                    sx={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '1',
                                    }}>
                                    {contact.firstName + ' ' + contact.lastName}
                                </Typography>
                                <Typography variant='caption' color='text.secondary'>
                                    {contact.email} {params.slug}
                                </Typography>
                            </React.Fragment>
                        )}
                    </Grid>
                    <Grid item xs>
                        <Stack direction='row' justifyContent='flex-end'>
                            {contact.blocked && (
                                <BlockIcon sx={{ fontSize: 18, mr: 0.5 }} color='primary' />
                            )}
                            {contact.muted && (
                                <VolumeMuteIcon sx={{ fontSize: 18 }} color='primary' />
                            )}
                        </Stack>
                        <Stack direction='row' justifyContent='flex-end'>
                            <IconButton
                                onClick={openCallMenu}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                    background: 'background.default',
                                    boxShadow: '8px 8px 8px #d2d4d685, -8px -8px 8px #ffffff82',
                                    mr: 2,
                                }}>
                                <PhoneOutlinedIcon />
                            </IconButton>
                            <Box position='relative'>
                                <IconButton
                                    onClick={toggleSearch}
                                    sx={{
                                        textAlign: 'center',
                                        color: 'primary.main',
                                        borderRadius: '500px',
                                        background: 'background.default',
                                        boxShadow: '8px 8px 8px #d2d4d685, -8px -8px 8px #ffffff82',
                                        mr: 2,
                                    }}>
                                    <SearchOutlinedIcon />
                                </IconButton>
                                {searchOpen && (
                                    <Box
                                        position='absolute'
                                        sx={{
                                            top: '60px',
                                            right: 0,
                                            width: { xs: 302, sm: 402 },
                                            zIndex: 2000,
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                                            border: '1px solid',
                                            borderColor: 'common.white',
                                            backdropFilter: 'blur(6px)',
                                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '8px',
                                            p: 1,
                                            transition: '200ms',
                                        }}>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            sx={{ position: 'relative' }}>
                                            <TextField
                                                fullWidth
                                                autoComplete='false'
                                                variant='standard'
                                                size='small'
                                                placeholder='Search within chat'
                                                value={textToSearch}
                                                // onChange={e => setTextToSearch(e.target.value)}
                                                // onKeyDown={e => {
                                                //     if (e.key === 'Enter') messageSearch();
                                                // }}
                                                sx={{ mb: 0, '& input': { pr: 7 } }}
                                            />
                                            {Boolean(searchedData.ids.length) && (
                                                <Typography
                                                    variant='caption'
                                                    sx={{ position: 'absolute', right: 152 }}>
                                                    {navigateOnSearch.index + 1} of{' '}
                                                    {searchedData.ids.length}{' '}
                                                </Typography>
                                            )}
                                            <IconButton
                                                color='primary'
                                                onClick={() => {
                                                    if (navigateOnSearch.index === 0) return;
                                                    const index = --navigateOnSearch.index;
                                                    setNavigateOnSearch({
                                                        id: searchedData.ids[index],
                                                        index,
                                                    });
                                                }}>
                                                <KeyboardArrowUpIcon />
                                            </IconButton>
                                            <IconButton
                                                color='primary'
                                                onClick={() => {
                                                    if (
                                                        navigateOnSearch.index ===
                                                        searchedData.ids.length - 1
                                                    )
                                                        return;
                                                    const index = ++navigateOnSearch.index;
                                                    setNavigateOnSearch({
                                                        id: searchedData.ids[index],
                                                        index,
                                                    });
                                                }}>
                                                <KeyboardArrowDownIcon />
                                            </IconButton>
                                            <IconButton color='primary'>
                                                <SearchOutlinedIcon fontSize='small' />
                                            </IconButton>
                                            <IconButton
                                                color='primary'
                                                onClick={() => {
                                                    setTextToSearch('');
                                                    setNavigateOnSearch({ id: 0, index: 0 });
                                                    setSearchedData({ ids: [], pages: [] });
                                                    toggleSearch();
                                                }}>
                                                <CloseIcon fontSize='small' />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                )}
                            </Box>
                            <IconButton
                                onClick={openMoreMenu}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                    background: 'background.default',
                                    boxShadow: '8px 8px 8px #d2d4d685, -8px -8px 8px #ffffff82',
                                }}>
                                <MoreHorizIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            {/* <Box
                id='bottom'
                sx={{
                    height: 'calc(100% - 188px)',
                    overflowY: 'auto',
                    flexGrow: 1,
                    overflowX: 'hidden',
                }}
                ref={containerRef}
                onScroll={(e: MouseEvent) => {
                    const { scrollTop, scrollHeight } = e.target as HTMLElement;
                    let calc = scrollHeight - 1000;
                    if (scrollTop < calc) return setScrollArrow(true);
                    setScrollArrow(false);
                }}>
                <Container maxWidth='lg' sx={{ pt: 2, height: '100%' }}>
                    <Box display='flex' flexDirection='column'>
                        {messages.map((message, i) => {
                            messageRef.current[message.id] = {
                                current: null,
                            };
                            return (
                                <React.Fragment key={i}>
                                    <Box
                                        position='sticky'
                                        top={8}
                                        borderRadius='8px'
                                        bgcolor='background.default'
                                        py={0.4}
                                        px={1}
                                        my={1}
                                        alignSelf='center'
                                        fontSize={13}
                                        width={100}
                                        textAlign='center'
                                        display={
                                            compareDate(
                                                message.creation_time,
                                                messages[i - 1]?.creation_time
                                            )
                                                ? 'none'
                                                : 'block'
                                        }
                                        zIndex={100}>
                                        {generateDate(message.creation_time)}
                                    </Box>

                                    <Message
                                        ref={{
                                            messageRef: messageRef.current[message.id],
                                            upwardRef: i === 3 ? ref : null,
                                        }}
                                        message={message}
                                        index={i}
                                        selectedMessage={
                                            message.id === selectedMessage.id ? selectedMessage : {}
                                        }
                                        setSelectedMessage={setSelectedMessage}
                                        openActionMenu={openActionMenu}
                                        highlight={searchedData.ids.includes(message.id)}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Box>
                </Container>
            </Box> */}
            {/* <Box p={2}>
                <Input selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
            </Box> */}

            <Menu
                anchorEl={anchorElAction}
                open={Boolean(anchorElAction)}
                onClose={() => {
                    closeActionMenu();
                    setSelectedMessage({ ...selectedMessage, actionMenuOpen: false });
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                // type='glassMorphism'
                sx={{
                    '& .MuiButtonBase-root:hover': {
                        backgroundColor: 'primary.main',
                        '& .MuiTypography-root': {
                            color: 'white',
                        },
                    },
                }}>
                <MenuItem
                    onClick={() => {
                        closeActionMenu();
                        setSelectedMessage({ ...selectedMessage, repliable: true });
                    }}>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Reply
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                        setSelectedMessage({ ...selectedMessage, actionMenuOpen: false });
                        closeActionMenu();
                        // openEmojiMenu(e);
                    }}>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        React
                    </ListItemText>
                </MenuItem>
                <MenuItem
                // onClick={() => {
                //     setSelectedMessage({
                //         ...selectedMessage,
                //         actionMenuOpen: false,
                //         important: !selectedMessage.important,
                //     });
                //     closeActionMenu();
                //     handleImportant(!selectedMessage.important);
                // }}
                >
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        {/* {selectedMessage.important ? 'Unstar' : 'Star'} */}
                    </ListItemText>
                </MenuItem>
            </Menu>

            <Menu
                anchorEl={anchorElEmoji}
                open={Boolean(anchorElEmoji)}
                onClose={closeEmojiMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        backgroundColor: 'transparent',
                        // overflowX: 'unset',
                        '& .MuiList-root': {
                            padding: 0,
                        },
                    },
                }}>
                <Picker
                    open={Boolean(anchorElEmoji)}
                    // onEmojiClick={handleReaction}
                    emojiVersion='11.0'
                />
            </Menu>

            <Menu
                anchorEl={anchorElMore}
                open={Boolean(anchorElMore)}
                onClose={closeMoreMenu}
                sx={{
                    marginTop: '15px',
                    '& .MuiButtonBase-root:hover': {
                        backgroundColor: 'primary.main',
                        '& .MuiTypography-root': {
                            color: 'white',
                        },
                    },
                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                        width: 'min(100%, 280px)',
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        border: '1px solid #00000017',
                        bgcolor: 'custom.menu',
                        px: 0.5,
                        py: 1.1,
                    },
                }}>
                <MenuItem>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Contact Info
                    </ListItemText>
                </MenuItem>
                <MenuItem
                // onClick={() => {
                //     closeMoreMenu();
                //     dispatch(setActivePanel(2));
                //     dispatch(setSelectedTab(0));
                //     dispatch(setSidePanel(true));
                // }}
                >
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Media
                    </ListItemText>
                </MenuItem>
                <MenuItem
                // onClick={() => {
                //     closeMoreMenu();
                //     dispatch(setActivePanel(2));
                //     dispatch(setSelectedTab(1));
                //     dispatch(setSidePanel(true));
                // }}
                >
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Link
                    </ListItemText>
                </MenuItem>
                <MenuItem
                // onClick={() => {
                //     closeMoreMenu();
                //     dispatch(setActivePanel(2));
                //     dispatch(setSelectedTab(2));
                //     dispatch(setSidePanel(true));
                // }}
                >
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Doc
                    </ListItemText>
                </MenuItem>
                <MenuItem
                // onClick={() => {
                //     closeMoreMenu();
                //     dispatch(setActivePanel(2));
                //     dispatch(setSelectedTab(3));
                //     dispatch(setSidePanel(true));
                // }}
                >
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Starred messages
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        closeMoreMenu();
                        openMuteModal();
                    }}>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        {contact.muted ? 'Unmute' : 'Mute'}
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        closeMoreMenu();
                        openBlockModal();
                    }}>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        {contact.blocked ? 'Unblock' : 'Block'}
                    </ListItemText>
                </MenuItem>
            </Menu>

            <Menu
                anchorEl={anchorElCall}
                open={Boolean(anchorElCall)}
                onClose={closeCallMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ marginTop: '20px' }}
                // type='glassMorphism'
            >
                <Typography variant='subtitle2' fontWeight={500} color='text.secondary'>
                    This feature will be available soon
                </Typography>
            </Menu>

            <Modal
                open={muteState}
                onClose={closeMuteModal}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: 'min(100%, 510px)',
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        border: '1px solid',
                        borderColor: 'white',
                        backdropFilter: 'blur(6px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        p: 2,
                    }}>
                    <Typography variant='subtitle1'>
                        {contact.muted ? 'Unmute' : 'Mute'} {contact.firstName} {contact.lastName} ?
                    </Typography>

                    <Box mt={3} sx={{ float: 'right' }}>
                        <Button variant='text' sx={{ mr: 1.5 }} onClick={closeMuteModal}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            // onClick={muteCustomer}
                            endIcon={muteCircular}>
                            {contact.muted ? 'Unmute' : 'Mute'}
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={blockState}
                onClose={closeBlockModal}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: 'min(100%, 510px)',
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        border: '1px solid',
                        borderColor: 'white',
                        backdropFilter: 'blur(6px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        p: 2,
                    }}>
                    <Typography variant='subtitle1'>
                        {contact.blocked ? 'Unblock' : 'Block'} {contact.firstName}{' '}
                        {contact.lastName} ?
                    </Typography>
                    {!contact.blocked && (
                        <>
                            <Divider variant='fullWidth' sx={{ my: 1 }} />
                            <Typography variant='body2' mb={2}>
                                Blocked customers will no longer be able to call you or send you
                                messages.
                            </Typography>
                        </>
                    )}

                    <Box mt={3} sx={{ float: 'right' }}>
                        <Button variant='text' sx={{ mr: 1.5 }} onClick={closeBlockModal}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            //  onClick={blockCustomer}
                            endIcon={blockCircular}>
                            {' '}
                            {contact.blocked ? 'Unblock' : 'Block'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {scrollArrow ? (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                        borderRadius: '500px',
                        position: 'absolute',
                        right: 16,
                        bottom: 100,
                        zIndex: 1000,
                    }}>
                    <IconButton
                        color='primary'
                        sx={{ p: 1 }}
                        // onClick={scrollToBottom}
                    >
                        <SouthIcon />
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default Chat;

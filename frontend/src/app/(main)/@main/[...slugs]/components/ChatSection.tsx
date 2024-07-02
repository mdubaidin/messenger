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
// import Input from './Chat/Input';
// import Message from './Chat/Message';
import { useMenu } from '@/hooks/useMenu';
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

// Icons
import { MdArrowUpward } from 'react-icons/md';

const ChatSection = () => {
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

    const [scrollArrow, setScrollArrow] = useState(false);

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

    return (
        <Box
            id='bottom'
            sx={{
                height: 'calc(100% - 188px)',
                overflowY: 'auto',
                flexGrow: 1,
                overflowX: 'hidden',
            }}
            // ref={containerRef}
            // onScroll={(e: MouseEvent) => {
            //     const { scrollTop, scrollHeight } = e.target as HTMLElement;
            //     let calc = scrollHeight - 1000;
            //     if (scrollTop < calc) return setScrollArrow(true);
            //     setScrollArrow(false);
            // }}
        >
            <Container maxWidth='lg' sx={{ pt: 2, height: '100%' }}>
                <Box display='flex' flexDirection='column'>
                    {/* {messages.map((message, i) => {
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
                        })} */}
                </Box>
            </Container>

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
                        <MdArrowUpward />
                    </IconButton>
                </Box>
            ) : null}

            <Menu
                anchorEl={anchorElAction}
                open={Boolean(anchorElAction)}
                onClose={() => {
                    closeActionMenu();
                    // setSelectedMessage({ ...selectedMessage, actionMenuOpen: false });
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
                        // setSelectedMessage({ ...selectedMessage, repliable: true });
                    }}>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Reply
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                        // setSelectedMessage({ ...selectedMessage, actionMenuOpen: false });
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
        </Box>
    );
};

export default ChatSection;

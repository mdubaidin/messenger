'use client';

import {
    Badge,
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
import useModal from '@/hooks/useModal';
import useLoader from '@/hooks/useLoader';
// import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

// Icons
import { IoMdMore, IoIosVideocam } from 'react-icons/io';
import { MdBlock } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa6';
import { notFound } from 'next/navigation';
import { setContactPanel } from '@/redux/features/contact/contactSlice';

type HeaderProps = {
    contactId: string;
};

const Header = ({ contactId }: HeaderProps) => {
    const contact = useAppSelector(state => state.contact.contact);
    const contactPanel = useAppSelector(state => state.contact.contactPanel);
    const dispatch = useAppDispatch();

    const toggleContactPanel = () => dispatch(setContactPanel(!contactPanel));

    // if (contactId !== contact._id) return notFound();

    const { anchorEl: anchorElCall, openMenu: openCallMenu, closeMenu: closeCallMenu } = useMenu();

    const {
        modalState: blockState,
        openModal: openBlockModal,
        closeModal: closeBlockModal,
    } = useModal();

    const { start: blockStart, end: blockEnd, circular: blockCircular } = useLoader();

    return (
        <>
            <Box
                sx={{
                    backdropFilter: 'blur(16px) saturate(180%)',
                    '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}>
                <Grid container px={1} py={1.6} gap={1.5} alignItems='center'>
                    <Grid item>
                        <Badge
                            badgeContent=' '
                            color='success'
                            variant='dot'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            sx={{
                                '.MuiBadge-badge': {
                                    bottom: 7,
                                    right: 7,
                                },
                            }}>
                            <Avatar
                                alt='Remy Sharp'
                                src={contact.picture}
                                sx={{
                                    width: 45,
                                    height: 45,
                                }}
                            />
                        </Badge>
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
                                    variant='subtitle1'
                                    lineHeight={1.2}
                                    fontWeight='500'
                                    sx={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '1',
                                    }}>
                                    {contact.name}
                                </Typography>
                                <Typography variant='body2' fontWeight={500} color='text.secondary'>
                                    Active now
                                </Typography>
                            </React.Fragment>
                        )}
                    </Grid>
                    <Grid item xs>
                        <Stack direction='row' justifyContent='flex-end' color='primary'>
                            {contact.blocked && (
                                <MdBlock style={{ fontSize: 18, marginRight: '4px' }} />
                            )}
                        </Stack>
                        <Stack direction='row' justifyContent='flex-end'>
                            <IconButton
                                onClick={openCallMenu}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                    mr: 0.5,
                                }}>
                                <FaPhone size={18} />
                            </IconButton>
                            <IconButton
                                onClick={openCallMenu}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                    mr: 0.5,
                                }}>
                                <IoIosVideocam />
                            </IconButton>
                            <IconButton
                                onClick={toggleContactPanel}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                }}>
                                <IoMdMore size={18} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
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
                sx={{ marginTop: '20px' }}>
                <Typography variant='subtitle2' fontWeight={500} color='text.secondary'>
                    This feature will be available soon
                </Typography>
            </Menu>

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
                        {contact.blocked ? 'Unblock' : 'Block'} {contact.name} ?
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
        </>
    );
};

export default Header;

'use client';

import {
    Box,
    FormControl,
    IconButton,
    InputBase,
    InputBaseProps,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import React, { MouseEvent, KeyboardEvent, useRef, useState, ChangeEvent } from 'react';
import AttachFile from '@mui/icons-material/AttachFileOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { useMenu } from '@/hooks/useMenu';
import useModal from '@/hooks/useModal';
import { useMessage } from '@/providers/Provider';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import useErrorHandler from '@/hooks/useErrorHandler';
import eventEmitter from '@/utils/eventEmitter';
import FileHandler from './FileHandler';
import Close from '@mui/icons-material/Close';
import { parseLinks } from '@/utils/function';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

const ChatBoxWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    border: '1px solid white',
    borderRadius: '8px',
    opacity: 0.7,
    padding: '4px',
    transition: 'all 235ms ease-in-out',
}));

const IconLeft = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    position: 'absolute',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
}));

const IconRight = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        maxHeight: '100px',
        padding: theme.spacing(1, 1, 1, 0),
        marginLeft: `calc(1em + ${theme.spacing(4)})`,
        marginRight: `calc(1em + ${theme.spacing(7)})`,
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(1.5, 1, 1.5),
        },
        transition: theme.transitions.create('width'),
        width: '100%',
        // '&:focus': {
        //     backgroundColor: theme.palette.custom.search.focus,
        //     boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 3px',
        //     borderRadius: '20px',
        // },
    },
}));

interface InputProps extends InputBaseProps {
    selectedMessage?: object;
    setSelectedMessage?: React.Dispatch<React.SetStateAction<string>>;
}

const Input = (props: InputProps) => {
    const { selectedMessage, setSelectedMessage } = props;
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState<string>('');
    const [caret, setCaret] = useState<number | null>(null);
    const contact = useAppSelector(state => state.contact.contact);
    const queryClient = useQueryClient();
    const { showError } = useMessage();
    const errorHandler = useErrorHandler();

    const {
        anchorEl: attachFileAnchorEl,
        openMenu: openAttachFile,
        closeMenu: closeAttachFile,
    } = useMenu();

    const { anchorEl: emojiAnchorEl, openMenu: openEmoji, closeMenu: closeEmoji } = useMenu();

    const { modalState, closeModal, openModal } = useModal();

    const fileRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // const { mutate } = useMutation({
    //     mutationFn: async message => {
    //         return await axios.post('/messages/', message);
    //     },
    //     onMutate: data => {
    //         selectedMessage = false;
    //         setMessage('')
    //         // if (data.conversation)
    //         //     queryClient.setQueryData(['chat', data.conversation], prevData => {
    //         //         const { pages } = prevData;
    //         //         const data = pages.flatMap(page => page.results).reverse();
    //         //         data.push({ ...data, sender: 'assistance' });
    //         //         return { ...prevData };
    //         //     });

    //         eventEmitter.emit('mutatingMessage');
    //     },
    //     onSuccess: data => {
    //         queryClient.invalidateQueries(['chat', data.conversation], { exact: true });
    //     },
    //     onError: error => {
    //         errorHandler(error);
    //     },
    // });

    // const sendMessage = () => {
    //     const msg = parseLinks(message);

    //     const messageObject = conversation.id
    //         ? {
    //               customer: contact.id,
    //               messaging_app: conversation.messaging_app,
    //               conversation: conversation.id,
    //               content: msg,
    //               subject: '',
    //               attachment: [],
    //           }
    //         : {
    //               customer: contact.id,
    //               messaging_app: conversation.messaging_app,
    //               content: msg,
    //           };

    //     if (selectedMessage.repliable) messageObject.reply = { id: selectedMessage.id };

    //     mutate(messageObject);
    // };

    const fileHandler = (e: ChangeEvent) => {
        e.stopPropagation();
        closeAttachFile();
        const event = e.target as HTMLInputElement;

        const files = event.files || [];
        if (!files.length) return showError('No file selected');
        // Object.keys(files).map((key: number) => (files[key] = URL.createObjectURL(files[key])));
        openModal();
        // dispatch(setFiles(files));
    };

    const onChangeHandler = (e: ChangeEvent) => {
        const event = e.target as HTMLInputElement;
        setCaret(event.selectionStart);
        setMessage(event.value);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const { key } = e;
        if (e.shiftKey && key === 'Enter') return;
        if (e.ctrlKey && key === 'Enter') return;
        if (key === 'Enter' && message?.trim()) {
            // sendMessage();
            e.preventDefault();
            console.log('message sent');
        }
    };

    // const emojiPicker = ({ emoji }) => {
    //     try {
    //         const newValue = message.slice(0, caret) + emoji + message.slice(caret);
    //         dispatch(setMessage(newValue));
    //         dispatch(setCaret(caret + emoji.length));
    //         inputRef.current?.focus();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // useEffect(() => {
    //     if (inputRef.current) {
    //         dispatch(setRef(inputRef.current));
    //     }
    // }, [dispatch]);

    return (
        <React.Fragment>
            <ChatBoxWrapper>
                {false && (
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            height: 50,
                            width: '100%',
                            bgcolor: 'lightgray',
                            borderLeft: '3px solid',
                            borderColor: 'primary.main',
                        }}>
                        <Box flexGrow={1} p={1}>
                            <Typography variant='subtitle2' fontWeight={500} color='primary.main'>
                                {contact.firstName + ' ' + contact.lastName}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: '1',
                                }}>
                                {/* {selectedMessage} */}
                                hello
                            </Typography>
                        </Box>
                        <IconButton
                        //  onClick={() => setSelectedMessage({})}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                )}
                <Stack direction='row' sx={{ width: '100%' }}>
                    <IconLeft>
                        <IconButton
                            sx={{ transform: 'rotate(45deg)' }}
                            color='primary'
                            onClick={openAttachFile}>
                            <AttachFile />
                        </IconButton>
                    </IconLeft>
                    <FormControl fullWidth>
                        <StyledInputBase
                            sx={{
                                flex: 1,
                            }}
                            ref={inputRef}
                            value={message}
                            onMouseUp={(e: MouseEvent) => {
                                const event = e.target as HTMLInputElement;
                                setCaret(event.selectionStart);
                            }}
                            onKeyUp={(e: KeyboardEvent) => {
                                const event = e.target as HTMLInputElement;
                                setCaret(event.selectionStart);
                            }}
                            placeholder='Type a message'
                            onKeyDown={handleKeyDown}
                            onChange={onChangeHandler}
                            multiline
                            maxRows={5}
                        />
                    </FormControl>
                    <IconRight>
                        <IconButton onClick={openEmoji}>
                            <AddReactionOutlinedIcon color='primary' />
                        </IconButton>
                        {message?.trim() ? (
                            <IconButton
                            // onClick={sendMessage}
                            >
                                <SendOutlinedIcon color='primary' />
                            </IconButton>
                        ) : (
                            <IconButton>
                                <KeyboardVoiceOutlinedIcon color='primary' />
                            </IconButton>
                        )}
                    </IconRight>
                </Stack>
            </ChatBoxWrapper>

            <Modal
                open={modalState}
                onClose={() => {
                    // dispatch(setFiles({}));
                    closeModal();
                }}
                slotProps={{ backdrop: { invisible: true } }}>
                <>
                    <FileHandler
                        // mutate={mutate}
                        closeModal={closeModal}
                    />
                </>
            </Modal>

            <Menu
                anchorEl={emojiAnchorEl}
                open={Boolean(emojiAnchorEl)}
                onClose={closeEmoji}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                sx={{
                    transform: 'translateY(-20px)',
                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        border: '1px solid',
                        borderColor: 'common.white',
                        backdropFilter: 'blur(6px)',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        overflowY: 'unset',
                    },
                    '& .MuiList-root': {
                        p: 0,
                    },
                }}>
                <EmojiPicker
                    open={Boolean(emojiAnchorEl)}
                    lazyLoadEmojis={true}
                    emojiVersion='11.0'
                    autoFocusSearch={false}
                    // onEmojiClick={emojiPicker}
                    style={{ background: 'transparent', border: 'none' }}
                />
            </Menu>

            <Menu
                anchorEl={attachFileAnchorEl}
                open={Boolean(attachFileAnchorEl)}
                onClose={closeAttachFile}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    bottom: 0,
                    transform: 'translateY(-20px)',
                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                        width: 'min(100%, 200px)',
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        border: '1px solid',
                        borderColor: 'common.white',
                        backdropFilter: 'blur(6px)',
                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '8px',
                        px: 0.2,
                        py: 1.5,
                        overflowY: 'unset',
                    },
                    '& .MuiButtonBase-root:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                    },
                }}>
                <MenuItem onClick={() => fileRef.current && fileRef.current.click()}>
                    <ListItemIcon>
                        <InsertDriveFileOutlinedIcon fontSize='small' color='primary' />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: 14, color: 'text.secondary' }}>
                        Upload file
                    </ListItemText>
                </MenuItem>
            </Menu>

            <input
                type='file'
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={fileHandler}
                multiple
            />
        </React.Fragment>
    );
};

export default Input;

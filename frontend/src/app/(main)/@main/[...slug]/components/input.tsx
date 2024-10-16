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
import useMenu from '@/hooks/useMenu';
import useModal from '@/hooks/useModal';
import EmojiPicker from 'emoji-picker-react';
import useErrorHandler from '@/hooks/useErrorHandler';
import Attachment from './attachment';
import { useAppDispatch, useAppSelector } from '@/store/hook';

// Icons
import { BiSolidMicrophone } from 'react-icons/bi';
import { PiStickerFill } from 'react-icons/pi';
import { IoMdSend, IoMdAddCircle, IoMdClose } from 'react-icons/io';
import { AiFillLike } from 'react-icons/ai';
import { BsEmojiSmileFill, BsImage } from 'react-icons/bs';
import { toast } from 'sonner';

const ChatBoxWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 235ms ease-in-out',
    padding: 10,
}));

const InputWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.search,
    display: 'flex',
    width: '100%',
    borderRadius: 500,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    padding: 0,
    '& .MuiInputBase-input': {
        maxHeight: '100px',
        paddingInline: 16,
        fontSize: 15,
        overflow: 'hidden',
        transition: theme.transitions.create('width'),
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
    const chat = useAppSelector(state => state.chat.chat);
    // const queryClient = useQueryClient();
    const errorHandler = useErrorHandler();

    const { anchorEl: attachFileAnchorEl, openMenu: openAttachFile, closeMenu: closeAttachFile } = useMenu();

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
        if (!files.length) return toast.error('No file selected');
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
                        justifyContent='center'
                        spacing={2}
                        sx={{
                            height: 50,
                            width: '100%',
                            bgcolor: 'background.search',
                            borderLeft: '3px solid',
                            borderColor: 'primary.main',
                            borderRadius: '5px',
                            mb: 1,
                        }}>
                        <Box flexGrow={1} p={1}>
                            <Typography variant='subtitle2' fontWeight={500} color='primary.main'>
                                {chat?.name}
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
                            <IoMdClose />
                        </IconButton>
                    </Stack>
                )}
                <Stack direction='row'>
                    <IconButton color='primary' onClick={openAttachFile}>
                        <IoMdAddCircle />
                    </IconButton>
                    <InputWrapper>
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

                        <IconButton color='primary'>
                            <PiStickerFill />
                        </IconButton>
                        <IconButton onClick={openEmoji} color='primary'>
                            <BsEmojiSmileFill size='20' />
                        </IconButton>
                    </InputWrapper>
                    {message?.trim() ? (
                        <IconButton
                            color='primary'
                            // onClick={sendMessage}
                        >
                            <IoMdSend />
                        </IconButton>
                    ) : (
                        <IconButton color='primary'>
                            <AiFillLike />
                        </IconButton>
                    )}
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
                    <Attachment
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
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
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
                        width: 'min(100%, 240px)',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '8px',
                        p: 0.2,
                        overflowY: 'unset',
                    },

                    '& .MuiListItemIcon-root': {
                        minWidth: 25,
                    },
                }}>
                <MenuItem color='primary' onClick={() => fileRef.current && fileRef.current.click()}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                        <BiSolidMicrophone />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: 14 }}>Send a voice clip</ListItemText>
                </MenuItem>
                <MenuItem color='primary' onClick={() => fileRef.current && fileRef.current.click()}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                        <BsImage />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontSize: 14 }}>Attach a file</ListItemText>
                </MenuItem>
            </Menu>

            <input type='file' ref={fileRef} style={{ display: 'none' }} onChange={fileHandler} multiple />
        </React.Fragment>
    );
};

export default Input;

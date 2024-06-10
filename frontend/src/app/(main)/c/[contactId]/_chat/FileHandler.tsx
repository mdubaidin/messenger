'use client';

import React, { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { useMenu } from '@/hooks/useMenu';
import { Box, IconButton, Menu, Stack, TextField, Typography } from '@mui/material';
import Image from '@/components/Image';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { getBase64, getFileType, isImage, parseKB } from '@/utils/function';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Close from '@mui/icons-material/Close';
import { useAppSelector } from '@/redux/hook';

interface FileHandlerProps {
    mutate?: any;
    closeModal: Function;
}

export interface File {
    url: string;
    name: string;
    size: number;
    type: string;
}

const FileHandler: FC<FileHandlerProps> = props => {
    const { mutate, closeModal } = props;
    const contact = useAppSelector(state => state.contact.contact);
    const [fileMessage, setFileMessage] = useState('');
    const [caret, setCaret] = useState<number>(0);
    const [fileIndex, setFileIndex] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);

    const { anchorEl: emojiAnchorEl, openMenu: openEmoji, closeMenu: closeEmoji } = useMenu();

    const sendFile = async () => {
        closeModal();

        for (let file of files) {
            const data = {
                content: fileMessage,
                customer: contact.id,
                // attachment: [{ file: await getBase64(file) }],
            };

            mutate(data);
        }
        setFiles([]);
        setFileMessage('');
    };

    const onChangeHandler = (e: ChangeEvent) => {
        const event = e.target as HTMLInputElement;
        setCaret(event.selectionStart || 0);
        setFileMessage(event.value);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const { key } = e;
        if (key === 'Enter' && fileMessage?.trim()) {
            sendFile();
            e.preventDefault();
        }
    };

    const emojiPicker = ({ emoji }: EmojiClickData) => {
        try {
            const newValue = fileMessage.slice(0, caret) + emoji + fileMessage.slice(caret);
            setFileMessage(newValue);
            setCaret(caret + emoji.length);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                left: { xs: 0, sm: 320 },
                bottom: 16,
                width: 'min(100%, 670px)',
                minHeight: '488px',
                boxShadow:
                    'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                border: '1px solid',
                borderColor: 'common.white',
                backdropFilter: 'blur(6px)',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                p: 1.5,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box
                flexGrow={1}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'>
                {files.length ? (
                    isImage(files[fileIndex]) ? (
                        <>
                            <Image src={files[fileIndex].url} sx={{ maxHeight: '280px' }} />
                            <Typography
                                variant='subtitle2'
                                fontWeight={500}
                                color='text.secondary'
                                textOverflow='ellipsis'
                                overflow='hidden'
                                sx={{ textWrap: 'nowrap', mt: 1 }}>
                                {files[fileIndex]?.name}
                            </Typography>
                            <Typography
                                variant='body2'
                                fontWeight={500}
                                textOverflow='ellipsis'
                                overflow='hidden'
                                sx={{ textWrap: 'nowrap', mt: 1 }}>
                                {parseKB(files[fileIndex]?.size) +
                                    ', ' +
                                    getFileType(files[fileIndex].name) +
                                    ' File'}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Image name='general.png' sx={{ height: '100px' }} />
                            <Typography
                                variant='subtitle2'
                                fontWeight={500}
                                textOverflow='ellipsis'
                                overflow='hidden'
                                sx={{ textWrap: 'nowrap', mt: 1 }}>
                                {files[fileIndex].name}
                            </Typography>
                            <Typography
                                variant='body2'
                                fontWeight={500}
                                textOverflow='ellipsis'
                                overflow='hidden'
                                sx={{ textWrap: 'nowrap', mt: 1 }}>
                                {parseKB(files[fileIndex]?.size) +
                                    ', ' +
                                    getFileType(files[fileIndex]?.name) +
                                    ' File'}
                            </Typography>
                        </>
                    )
                ) : null}
            </Box>
            <Stack direction='row' alignItems='center' justifyContent='center'>
                {files.length ? (
                    <Stack direction='row' spacing={1} sx={{ overflowX: 'auto', my: 1 }}>
                        {Array.from(files).map((file, i) => (
                            <Box
                                key={i}
                                onClick={e => {
                                    e.preventDefault();
                                    setFileIndex(i);
                                }}
                                sx={{
                                    position: 'relative',
                                    borderRadius: '8px',
                                    border: '3px solid',
                                    borderColor: i === fileIndex ? 'primary.main' : 'transparent',
                                    backgroundColor: 'transparent',
                                    p: 0.2,
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    '&:hover': {
                                        '.MuiSvgIcon-root': {
                                            display: 'block',
                                        },
                                        '#overlay': {
                                            opacity: 1,
                                        },
                                    },
                                }}>
                                <Box
                                    id='overlay'
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                        backgroundImage: `linear-gradient(45deg, rgba(140,85,250, 0) 0%,rgba(200,215,253, 0) 55%,rgb(154,158,160) 100%)`,
                                        opacity: 0,
                                    }}
                                />
                                <Close
                                    onClick={e => {
                                        e.stopPropagation();
                                        const f = Array.from(files);
                                        f.splice(i, 1);
                                        const lastIndex = files.length - 1;
                                        if (lastIndex === 0) {
                                            closeModal();
                                            setFiles([]);
                                        }
                                        if (fileIndex === lastIndex) setFileIndex(prev => --prev);
                                        setFiles(f);
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        fontSize: 15,
                                        color: 'white',
                                        display: 'none',
                                    }}
                                />
                                {isImage(files[fileIndex]) ? (
                                    <Image src={file.url} sx={{ height: 50 }} />
                                ) : (
                                    <Image name='general.png' sx={{ height: 50 }} />
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : null}
            </Stack>
            <Stack
                direction='row'
                mt={1}
                justifyContent='space-between'
                alignItems='center'
                spacing={2}>
                <IconButton onClick={openEmoji}>
                    <AddReactionOutlinedIcon color='primary' />
                </IconButton>
                <TextField
                    fullWidth
                    variant='standard'
                    size='small'
                    placeholder='Type a message'
                    value={fileMessage}
                    onMouseUp={(e: MouseEvent) => {
                        const event = e.target as HTMLInputElement;
                        setCaret(event.selectionStart || 0);
                    }}
                    onKeyUp={(e: KeyboardEvent) => {
                        const event = e.target as HTMLInputElement;
                        setCaret(event.selectionStart || 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onChange={onChangeHandler}
                    sx={{ mb: 0 }}
                />
                <IconButton onClick={sendFile}>
                    <SendOutlinedIcon color='primary' />
                </IconButton>
            </Stack>
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
                    emojiVersion='11.0'
                    open={Boolean(emojiAnchorEl)}
                    lazyLoadEmojis={true}
                    autoFocusSearch={false}
                    onEmojiClick={emojiPicker}
                    style={{ background: 'transparent', border: 'none' }}
                />
            </Menu>
        </Box>
    );
};

export default FileHandler;

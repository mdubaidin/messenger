'use client';

import React, { ChangeEvent, Dispatch, FC, KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react';
import useMenu from '@/hooks/useMenu';
import { Box, Card, IconButton, Menu, Stack, TextField, Typography } from '@mui/material';
import { getBase64, getFileType, isImage, parseKB } from '@/utils/function';
import { useAppSelector } from '@/store/hook';

// Icons
import { IoMdSend, IoMdClose } from 'react-icons/io';
import { AttachmentType } from '@/types/types';
import Image from 'next/image';
import { LuCopyPlus } from 'react-icons/lu';

interface FileHandlerProps {
    mutate?: any;
    attachments: AttachmentType[];
    setAttachments: React.Dispatch<React.SetStateAction<AttachmentType[]>>;
    fileRef: React.RefObject<HTMLInputElement>;
}

export interface File {
    url: string;
    name: string;
    size: number;
    type: string;
}

const FileHandler: FC<FileHandlerProps> = props => {
    const { attachments, setAttachments, fileRef } = props;
    console.log(typeof setAttachments);
    // const [fileMessage, setFileMessage] = useState('');

    // const sendFile = async () => {
    //     for (let file of files) {
    //         const data = {
    //             content: fileMessage,
    //             customer: contact?._id,
    //             // attachment: [{ file: await getBase64(file) }],
    //         };

    //         mutate(data);
    //     }
    //     setFiles([]);
    //     setFileMessage('');
    // };

    function removeAttachment(e: MouseEvent, i: number) {
        e.stopPropagation();

        const f = [...attachments];
        f.splice(i, 1);
        setAttachments(f);
    }

    if (attachments.length === 0) return null;

    return (
        <Stack direction='row' spacing={1} p={2}>
            <IconButton variant='addAttachment' disableTouchRipple onClick={e => fileRef.current && fileRef.current.click()}>
                <LuCopyPlus />
            </IconButton>
            {attachments.map((file, i) => (
                <Box key={i} width={48} height={48} position='relative'>
                    <IconButton variant='removeAttachment' onClick={e => removeAttachment(e, i)}>
                        <IoMdClose fontWeight={800} size={12} />
                    </IconButton>

                    {file.type.startsWith('image/') && (
                        <Image src={file.url || 'general.png'} alt='Selected image' fill objectFit='cover' style={{ borderRadius: 8 }} />
                    )}
                    {file.type.startsWith('video/') && (
                        <video poster={file.url || 'general.png'} style={{ borderRadius: 8, width: 48, height: 48 }} />
                    )}
                </Box>
            ))}
        </Stack>
    );
};

export default FileHandler;

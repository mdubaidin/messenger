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
import { GrCirclePlay } from 'react-icons/gr';

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
        <Stack direction='row' flexWrap='nowrap' alignItems='center' justifyContent='flex-start' spacing={1.5} p={2} sx={{ overflowX: 'auto' }}>
            <IconButton variant='addAttachment' disableTouchRipple sx={{ minWidth: 0 }} onClick={() => fileRef.current && fileRef.current.click()}>
                <LuCopyPlus />
            </IconButton>

            {attachments.map((file, i) => (
                <Box key={i} width={48} height={48} position='relative'>
                    <IconButton variant='removeAttachment' onClick={e => removeAttachment(e, i)}>
                        <IoMdClose fontWeight={800} size={12} />
                    </IconButton>

                    {file.type.startsWith('image/') && (
                        <Image
                            src={file.url || 'general.png'}
                            alt='Selected image'
                            width={48}
                            height={48}
                            style={{ borderRadius: 8, objectFit: 'cover' }}
                        />
                    )}
                    {file.type.startsWith('video/') && <Video src={file.url || 'general.png'} />}
                </Box>
            ))}
        </Stack>
    );
};

function Video({ src }: { src: string }) {
    return (
        <Box position='relative' width={48} height={48} borderRadius={2} overflow='hidden'>
            <video width='100%' height='100%' src={src} style={{ objectFit: 'cover' }} />
            <GrCirclePlay color='white' size={25} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </Box>
    );
}

export default FileHandler;

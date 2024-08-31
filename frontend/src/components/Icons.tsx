import Stack from '@mui/material/Stack';
import React from 'react';

import { FaRegFile } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { GoFileMedia } from 'react-icons/go';

const MediaIcon = () => {
    return (
        <Stack
            alignItems='center'
            justifyContent='center'
            bgcolor='background.icons.media'
            borderRadius='10px'
            width={35}
            height={35}>
            <GoFileMedia color='#1fc780' size={16} />
        </Stack>
    );
};

const LinkIcon = () => {
    return (
        <Stack
            alignItems='center'
            justifyContent='center'
            bgcolor='background.icons.link'
            borderRadius='10px'
            width={35}
            height={35}>
            <FiLink color='#fbb54c' size={16} />
        </Stack>
    );
};

const FileIcon = () => {
    return (
        <Stack
            alignItems='center'
            justifyContent='center'
            bgcolor='background.icons.file'
            borderRadius='10px'
            width={35}
            height={35}>
            <FaRegFile color='#398fe1' size={16} />
        </Stack>
    );
};

export { MediaIcon, LinkIcon, FileIcon };

import Box from '@mui/material/Box';
import React, { useEffect, useMemo, useState } from 'react';

import Details from './Details';
import Search from './Search';
import useErrorHandler from '@/hooks/useErrorHandler';
import axios from 'axios';
import Media from '../attachments/Media';
import Links from '../attachments/Links';
import Docs from '../attachments/Docs';

type MainProps = {
    chatId: string;
};

const lookup = {
    details: Details,
    search: Search,
    media: Media,
    links: Links,
    docs: Docs,
};

export type Key = keyof typeof lookup;

const Main = (props: MainProps) => {
    const { chatId } = props;
    const [component, setComponent] = useState<Key>('details');
    const [chatInfo, setChatInfo] = useState<any>(null);
    const Component = useMemo(() => lookup[component], [component]);

    const errorHandler = useErrorHandler();

    const getChatInfo = async (id: string) => {
        try {
            const response = await axios.get(`/chats/${id}`);

            setChatInfo(response.data.chat);
        } catch (error) {
            errorHandler(error);
        }
    };

    useEffect(() => {
        if (!chatId) return;

        getChatInfo(chatId);
    }, [chatId]);

    return <Component setComponent={setComponent} chatInfo={chatInfo} />;
};

export default Main;

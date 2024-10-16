import { NextjsPageProps } from '@/types/types';
import Header from './components/header';
import Input from './components/input';
import MessageList from './components/messageList';
import Drawer from '../../../../components/drawer/drawer';
import Main from './main';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getServerQueryClient } from '@/config/apiClient';
import { getSessionCookie, getSessionCookieUser } from '@/actions/auth';
import { headers } from 'next/headers';
import { prefetchChatById } from '@/api/chats/server';

const Page = async () => {
    const queryClient = getServerQueryClient();
    const sessionCookie = await getSessionCookie();
    const user = await getSessionCookieUser();
    if (!sessionCookie || !user) return null;

    await prefetchChatById(queryClient, '66dc13a98c89ee1ae0a94eb7');

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Main>
                <Header />
                <MessageList />
                <Input />
            </Main>
        </HydrationBoundary>
    );
};
export default Page;

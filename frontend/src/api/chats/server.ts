import { getSessionCookie } from '@/actions/auth';
import { apiClient } from '@/config/apiClient';
import { queryKeys } from '@/config/queryKeys';
import { QueryClient } from '@tanstack/react-query';

export async function getChatList() {
    const sessionCookie = await getSessionCookie();
    return apiClient('/chats/all', { headers: { Authorization: sessionCookie } });
}

export function prefetchChatList(queryClient: QueryClient) {
    return queryClient.prefetchQuery({
        queryKey: [queryKeys.chats, 'all'],
        queryFn: getChatList,
    });
}

export async function getChatbyId(chatId: string) {
    const sessionCookie = await getSessionCookie();
    return apiClient(`/chats/${chatId}`, { headers: { Authorization: sessionCookie } });
}

export function prefetchChatById(queryClient: QueryClient, chatId: string) {
    return queryClient.prefetchQuery({
        queryKey: [queryKeys.chats, chatId],
        queryFn: () => getChatbyId(chatId),
    });
}

'use client';

import { apiClient } from '@/config/apiClient';
import { queryKeys } from '@/config/queryKeys';
import { ApiResponse, Chat } from '@/types/types';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export function useGetChatListQuery() {
    return useQuery({
        queryKey: [queryKeys.chats, 'all'],
        queryFn: () => apiClient<ApiResponse<Chat[]>>('/chats/all'),
        // staleTime: 0,
        // refetchOnMount: 'always',
        // refetchOnWindowFocus: true,
    });
}

export function useChatDetails(chatId: string) {
    return useSuspenseQuery({
        queryKey: [queryKeys.chats, chatId],
        queryFn: () => apiClient(`/chats/${chatId}`),
    });
}

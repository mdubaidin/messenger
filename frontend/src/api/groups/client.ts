import { apiClient } from '@/config/apiClient';
import { queryKeys } from '@/config/queryKeys';
import { ApiResponse, Group, Member } from '@/types/types';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export function useGroupDetails(groupId: string) {
    return useSuspenseQuery({
        queryKey: [queryKeys.groups, groupId],
        queryFn: () => apiClient<ApiResponse<Group>>(`/groups/${groupId}`),
    });
}

export function useGroupMembers(groupId: string) {
    return useSuspenseQuery({
        queryKey: [queryKeys.groups, queryKeys.members, groupId],
        queryFn: () => apiClient<ApiResponse<Member[]>>(`/groups/members/${groupId}`),
    });
}

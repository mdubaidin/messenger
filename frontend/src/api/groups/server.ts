import { getSessionCookie } from '@/actions/auth';
import { apiClient } from '@/config/apiClient';
import { queryKeys } from '@/config/queryKeys';
import { QueryClient } from '@tanstack/react-query';

export async function getGroupById(groupId: string) {
    const sessionCookie = await getSessionCookie();
    return apiClient(`/groups/${groupId}`, { headers: { Authorization: sessionCookie } });
}

export function prefetchGroupId(queryClient: QueryClient, groupId: string) {
    return queryClient.prefetchQuery({
        queryKey: [queryKeys.groups, groupId],
        queryFn: () => getGroupById(groupId),
    });
}

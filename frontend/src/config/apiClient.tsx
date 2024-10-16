import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

type OtherRequestOptions = {
    baseUrl?: string;
    downloadableContent?: { fileName: string };
};

export const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function apiClient<ResponseType = any>(endpoint: string, requestConfig?: AxiosRequestConfig, moreOptions?: OtherRequestOptions) {
    try {
        const res = await axios<ResponseType>({
            baseURL: moreOptions?.baseUrl ?? baseUrl,
            url: endpoint,
            withCredentials: true,
            method: 'GET',
            ...(requestConfig || {}),
            headers: {
                'Content-Type': 'application/json',
                ...(requestConfig?.headers || {}),
            },
        });

        return res.data;
    } catch (err) {
        return null;
    }
}

export function getServerQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

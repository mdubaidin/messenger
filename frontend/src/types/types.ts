export type CookieUser = { _id: string; name: string; email: string; picture: string };

export type ApiResponse<T> = { data: T; message: string; success: boolean };

export type NextjsPageProps<Params = {}, SearchParams = {}> = {
    params: Params;
    searchParams: SearchParams;
};

export type SettingOption = {
    name: string;
    icon: React.ReactNode;
    background: string;
    component: React.ElementType;
    setting: string | undefined;
};

export type PaginationType = {
    totalPages: number;
    totalData: number;
    currentPage: number;
    pageSize: number;
};

export type User = { _id: string; name: string; email: string; username?: string; picture?: string; bio?: string };
export type Member = { _id: string; name: string; username: string; picture?: string; admin?: boolean; group: string; bio?: string };

export type Chat = {
    _id: string;
    userId?: string;
    creator?: string;
    name: string;
    email?: string;
    blocked: boolean;
    muted: boolean;
    picture?: string;
    message?: string;
    time?: string;
    unreadMessage?: number;
    description?: string;
};

export type Group = {
    group: Chat;
    members: Member[];
};

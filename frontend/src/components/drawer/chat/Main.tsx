'use client';

import React, { useMemo, useState } from 'react';
import Details from './Details';
import Search from './Search';
import Media from '../attachments/Media';
import Links from '../attachments/Links';
import Docs from '../attachments/Docs';
import { useChatDetails } from '@/api/chats/client';
import { FailedToLoad } from '@/components/lib/notFound';

const lookup = {
    details: Details,
    search: Search,
    media: Media,
    links: Links,
    docs: Docs,
};

export type Key = keyof typeof lookup;

const Main = () => {
    const [component, setComponent] = useState<Key>('details');
    const Component = useMemo(() => lookup[component], [component]);

    return <Component setComponent={setComponent} />;
};

export default Main;

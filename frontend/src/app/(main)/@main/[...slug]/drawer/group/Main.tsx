import React, { useEffect, useMemo, useState } from 'react';
import Details from './Details';
import Search from './Search';
import useErrorHandler from '@/hooks/useErrorHandler';
import axios from 'axios';
import SearchMembers from './SearchMembers';
import Media from '../attachments/Media';
import Links from '../attachments/Links';
import Docs from '../attachments/Docs';

type MainProps = {
    groupId: string;
};

const lookup = {
    details: Details,
    search: Search,
    searchMembers: SearchMembers,
    media: Media,
    links: Links,
    docs: Docs,
};

export type Key = keyof typeof lookup;

const Main = (props: MainProps) => {
    const { groupId } = props;
    const [component, setComponent] = useState<Key>('details');
    const [groupInfo, setGroupInfo] = useState<any>(null);
    const [members, setMembers] = useState<any>([]);
    const errorHandler = useErrorHandler();
    const Component = useMemo(() => lookup[component], [component]);

    const getGroupInfo = async (id: string) => {
        try {
            const response = await axios.get(`/groups/${id}`);

            setGroupInfo(response.data.group);
            setMembers(response.data.members);
        } catch (error) {
            errorHandler(error);
        }
    };

    useEffect(() => {
        if (!groupId) return;

        getGroupInfo(groupId);
    }, [groupId]);

    return <Component setComponent={setComponent} groupInfo={groupInfo} members={members} />;
};

export default Main;

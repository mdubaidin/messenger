import { TbMessageCircle2Filled } from 'react-icons/tb';
import { BsPeopleFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { RiArchiveFill } from 'react-icons/ri';
import { IconType } from 'react-icons';

interface Structure {
    name: string;
    icon: IconType;
    href: string;
}

const Options: Structure[] = [
    {
        name: 'Chats',
        icon: TbMessageCircle2Filled,
        href: '/chats',
    },
    {
        name: 'People',
        icon: BsPeopleFill,
        href: '/active',
    },
    {
        name: 'Requests',
        icon: AiFillMessage,
        href: '/requests',
    },
    {
        name: 'Archive',
        icon: RiArchiveFill,
        href: '/archived',
    },
];

const Contacts = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        message: 'lorem ipsum',
        time: '2024-05-28T01:50:00',
        unreadMessage: 10,
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?img=2',
        message: 'lorem ipsum',
        time: '2024-05-28T01:50:00',
        unreadMessage: 10,
    },
    {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        message: 'lorem ipsum',
        time: '2024-05-28T01:50:00',
        unreadMessage: 10,
    },
];

export { Options, Contacts };

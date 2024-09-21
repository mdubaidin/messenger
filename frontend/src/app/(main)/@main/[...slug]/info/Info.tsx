// Icons
import GroupInfo from './GroupInfo';
import ChatInfo from './ChatInfo';
import { useAppSelector } from '@/redux/hook';

const Info = () => {
    const chat = useAppSelector(state => state.chat.chat);

    return chat ? (
        chat.creator ? (
            <GroupInfo groupId={chat._id} />
        ) : (
            <ChatInfo chatId={chat._id} />
        )
    ) : null;
};

export default Info;

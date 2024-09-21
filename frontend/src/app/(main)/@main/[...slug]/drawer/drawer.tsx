// Icons
import Group from './group/Main';
import Chat from './chat/Main';
import { useAppSelector } from '@/redux/hook';

const Drawer = () => {
    const chat = useAppSelector(state => state.chat.chat);

    return chat ? chat.creator ? <Group groupId={chat._id} /> : <Chat chatId={chat._id} /> : null;
};

export default Drawer;

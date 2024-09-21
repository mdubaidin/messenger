import { Namespace, Socket } from 'socket.io';

export default function (socket: Socket, io: Namespace) {
    console.log('A new user is connected to the chat socket', socket.id);
}

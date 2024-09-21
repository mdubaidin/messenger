import { Server } from 'http';
import { Socket } from 'socket.io';

const sendMessage = (message: any, socket: Socket) => {
    console.log('new message: ', message);
    socket.broadcast.emit('new_message', message);
};

export { sendMessage };

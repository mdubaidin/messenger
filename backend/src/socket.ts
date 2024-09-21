import { Server as httpServer } from 'http';
import chatSocket from './sockets/chats/socket.js';
import { Server } from 'socket.io';

export default function (server: httpServer) {
    const io = new Server(server);

    const chatio = io.of('/chat');

    chatio.on('connection', socket => chatSocket(socket, chatio));
}

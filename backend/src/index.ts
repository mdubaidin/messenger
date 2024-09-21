import app from './app.js';
import socket from './socket.js';
import { createServer } from 'http';

const port = process.env.PORT || 8001;
const server = createServer(app);

socket(server); // Socket.IO server listens for incoming connections on the provided server instance.

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

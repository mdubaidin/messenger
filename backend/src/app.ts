import './config/config.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import errorHandler from './middleware/errorHandler.js';
import authenticate from './middleware/authenticate.js';
import validateJWT from './middleware/validateJWT.js';
import authorize from './middleware/authorize.js';
import messageRouter from './routes/message.js';
import profileRouter from './routes/profile.js';
import requestRouter from './routes/request.js';
import chatRouter from './routes/chat.js';
import groupRouter from './routes/group.js';
import authRouter from './routes/auth.js';
import contactRouter from './routes/contact.js';

const app = express();
const server = createServer(app);
const socket = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
});

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/public', express.static('public'));

app.use('/api/auth', authorize, authRouter);

app.use(validateJWT);
app.use(authenticate);

socket.on('connection', socket => {
    console.log('a user connected ', socket.id);
});

app.use('/api/profile', profileRouter);
app.use('/api/messages', messageRouter);
app.use('/api/requests', requestRouter);
app.use('/api/chats', chatRouter);
app.use('/api/groups', groupRouter);
app.use('/api/contacts', contactRouter);

app.use(errorHandler);

export default server;

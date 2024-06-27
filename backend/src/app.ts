import './config/config.js';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';
import authenticate from './middleware/authenticate.js';
import userRouter from './routes/users.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import validateJWT from './middleware/validateJWT.js';
import authorize from './middleware/authorize.js';

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/public', express.static('public'));

app.use('/api/auth', authorize, authRouter);

app.use(validateJWT);
app.use(authenticate);

app.use('/api/users', userRouter);

app.use(errorHandler);

export default app;

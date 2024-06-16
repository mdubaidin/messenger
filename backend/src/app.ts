import './config/config.js';
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';
import authenticate from './middleware/authenticate.js';
import userRouter from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.use(authenticate);

app.use('/api/user', userRouter);

app.use(errorHandler);

export default app;

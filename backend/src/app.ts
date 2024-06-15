import './config/config.js';
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorHandler.js';
import passport from 'passport';
import './libs/passport/passport-jwt.js';
import './libs/openid-client/google.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/api/auth', authRouter);

app.use('/api', passport.authenticate('jwt', { session: false }));

app.get('/api/', (req: Request, res: Response) => {
    console.log(req.user);
    res.success('Hello World');
});

app.use(errorHandler);

export default app;

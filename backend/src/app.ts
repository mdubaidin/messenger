import './config/config';
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import errorHandler from './middleware/errorHandler';
import passport from 'passport';
import passportJWT from './libs/passport/passport-jwt';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(passportJWT);

app.use(passport.initialize());

app.use('/api/auth', authRouter);

app.use('/api', passport.authenticate('jwt', { session: false }));

app.get('/api/', (req: Request, res: Response) => {
    console.log(req.user);
    res.success('Hello World');
});

app.use(errorHandler);

export default app;

import express from 'express';
import { createAccount, initiateEmail } from '../controllers/auth/createAccount.js';
import { login } from '../controllers/auth/login.js';

import refreshAccessToken from '../controllers/auth/refreshAccessToken.js';
import logout from '../controllers/auth/logout.js';
import authenticate from '../middleware/authenticate.js';
import googleRouter from './auth/google.js';
import facebookRouter from './auth/facebook.js';
import validateJWT from '../middleware/validateJWT.js';

const authRouter = express.Router();

authRouter.use('/google', googleRouter);
authRouter.use('/facebook', facebookRouter);

// GET
authRouter.get('/logout', validateJWT, authenticate, logout);
// authRouter.get('/reset-code/:email', generateResetToken);

// POST
authRouter.post('/create-account/step1', initiateEmail);
authRouter.post('/create-account/step2', createAccount);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshAccessToken);
// authRouter.post('/users-info', getUsersInfo);
// authRouter.post('/exists/email', exists('email'));
// authRouter.post('/find', checkEmail);
// authRouter.post('/verify/reset-code', verifyResetToken);
// authRouter.post('/unused-emails', getUnusedEmails);

// PATCH
// authRouter.patch('/create-password', createPassword);

export default authRouter;

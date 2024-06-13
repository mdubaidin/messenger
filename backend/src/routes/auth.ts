import express from 'express';
import { createAccount } from '../controllers/auth/createAccount';
import { login } from '../controllers/auth/login';

const authRouter = express.Router();

// GET
// authRouter.get('/reset-code/:email', generateResetToken);
// authRouter.get('/user-info', getUserInfo);

// POST
authRouter.post('/create', createAccount);
authRouter.post('/login', login);
// authRouter.post('/users-info', getUsersInfo);
// authRouter.post('/exists/email', exists('email'));
// authRouter.post('/find', checkEmail);
// authRouter.post('/verify/reset-code', verifyResetToken);
// authRouter.post('/unused-emails', getUnusedEmails);

// PATCH
// authRouter.patch('/create-password', createPassword);

export default authRouter;

import express from 'express';
import { createAccount } from '../controllers/auth/createAccount.js';
import { login } from '../controllers/auth/login.js';
import { googleClient, googleClientCallback } from '../libs/openid-client/google.js';
import refreshAccessToken from '../controllers/auth/refreshAccessToken.js';

const authRouter = express.Router();

// GET
// authRouter.get('/reset-code/:email', generateResetToken);
// authRouter.get('/user-info', getUserInfo);

// POST
authRouter.post('/create', createAccount);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshAccessToken);
// authRouter.post('/users-info', getUsersInfo);
// authRouter.post('/exists/email', exists('email'));
// authRouter.post('/find', checkEmail);
// authRouter.post('/verify/reset-code', verifyResetToken);
// authRouter.post('/unused-emails', getUnusedEmails);

// PATCH
// authRouter.patch('/create-password', createPassword);

authRouter.get('/google', googleClient);

authRouter.get('/google/callback', googleClientCallback);

authRouter.get('/profile', (req, res) => {
    console.log(req.user);
    if (!req.user) {
        return res.redirect('/auth/google');
    }
    res.json(req.user);
});

export default authRouter;

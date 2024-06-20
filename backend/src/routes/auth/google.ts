import express from 'express';
import { googleClient, googleClientCallback } from '../../libs/openid-client/google.js';

const googleRouter = express.Router();

// GET
googleRouter.get('/', googleClient);
googleRouter.get('/callback', googleClientCallback);

export default googleRouter;

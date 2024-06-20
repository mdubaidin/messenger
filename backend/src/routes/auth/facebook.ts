import express from 'express';
import { facebookClient, facebookClientCallback } from '../../libs/openid-client/facebook.js';

const facebookRouter = express.Router();

// GET
facebookRouter.get('/', facebookClient);
facebookRouter.get('/callback', facebookClientCallback);

export default facebookRouter;

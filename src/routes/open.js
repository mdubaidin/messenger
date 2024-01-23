import express from 'express';
import login from '../controllers/open/login.js';
import create from '../controllers/users/create.js';

const openRouter = new express.Router();

openRouter.post('/login', login);

openRouter.post('/signup', create);

export default openRouter;

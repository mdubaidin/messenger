import express from 'express';
import create from '../controllers/messages/create.js';
import fetch from '../controllers/messages/fetch.js';

const messageRouter = express.Router();

// GET
// requestRouter.get('/', fetch);
messageRouter.get('/:id', fetch);

// POST
messageRouter.post('/', create);

export default messageRouter;

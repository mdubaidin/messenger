import express from 'express';
import create from '../controllers/chats/create.js';
import { fetch, fetchAll } from '../controllers/chats/fetch.js';

const chatRouter = express.Router();

// GET
chatRouter.get('/', fetch);
chatRouter.get('/all', fetchAll);
chatRouter.get('/:id', fetch);

// POST
chatRouter.post('/', create);

// PATCH
// chatRouter.patch('/remove', remove);

export default chatRouter;

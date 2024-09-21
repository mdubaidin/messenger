import express from 'express';
import create from '../controllers/messages/create.js';
import fetch from '../controllers/messages/fetch.js';
import upload from '../libs/multer.js';
import attachments from '../controllers/messages/attachments.js';

const messageRouter = express.Router();

// GET
// requestRouter.get('/', fetch);
messageRouter.get('/:id', fetch);

// POST
messageRouter.post('/', create);
messageRouter.post('/attachment', upload.array('attachments', 100), attachments);

export default messageRouter;

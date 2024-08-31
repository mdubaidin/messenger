import express from 'express';
import fetch from '../controllers/contacts/fetch.js';

const contactRouter = express.Router();

// GET
contactRouter.get('/', fetch);
// requestRouter.get('/:id', fetch);

// POST
// contactRouter.post('/', create);

export default contactRouter;

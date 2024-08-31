import express from 'express';
import create from '../controllers/requests/create.js';
import fetch from '../controllers/requests/fetch.js';
import status from '../controllers/requests/status.js';

const requestRouter = express.Router();

// GET
requestRouter.get('/', fetch);
// requestRouter.get('/:id', fetch);

// POST
requestRouter.post('/', create);

// PATCH
requestRouter.patch('/:id', status);

export default requestRouter;

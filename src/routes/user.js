import express from 'express';
import fetch from '../controllers/users/fetch.js';
import create from '../controllers/users/create.js';

const userRouter = new express.Router();

// GET
userRouter.get('/:email', fetch);

export default userRouter;

import express from 'express';
import fetch from '../controllers/user/fetch.js';

const userRouter = express.Router();

// GET
userRouter.get('/', fetch);
userRouter.get('/:id', fetch);

export default userRouter;

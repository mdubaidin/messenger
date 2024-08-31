import express from 'express';
import fetch from '../controllers/profile/fetch.js';

const profileRouter = express.Router();

// GET
profileRouter.get('/', fetch);

export default profileRouter;

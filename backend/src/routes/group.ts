import express from 'express';
import create from '../controllers/groups/create.js';
import fetch from '../controllers/groups/fetch.js';
import join from '../controllers/groups/member/join.js';
import leave from '../controllers/groups/member/leave.js';
import adminRouter from './group/admin.js';
import isAdmin from '../middleware/isAdmin.js';
import upload from '../libs/multer.js';
import update from '../controllers/groups/update.js';

const groupRouter = express.Router();

groupRouter.use('/admin/:groupId/', isAdmin, adminRouter);

// GET
groupRouter.get('/', fetch);
groupRouter.get('/:id', fetch);

// POST
groupRouter.post('/', upload.single('picture'), create);

// PATCH
groupRouter.patch('/join/:id', join);
groupRouter.patch('/leave/:id', leave);
groupRouter.patch('/:id', upload.single('picture'), update);

// DELETE

export default groupRouter;

import express from 'express';
import assignAdmin from '../../controllers/groups/admin/assignAdmin.js';
import removeMember from '../../controllers/groups/admin/removeMember.js';
import deleteGroup from '../../controllers/groups/admin/deleteGroup.js';

const adminRouter = express.Router();

// GET

// POST

// PATCH
adminRouter.patch('/assign-admin/:id', assignAdmin);
adminRouter.patch('/remove-member/:id', removeMember);
adminRouter.patch('/remove-admin/:id', removeMember);

// DELETE
adminRouter.delete('/:id', deleteGroup);

export default adminRouter;

import express from 'express';
import { assignTask, assigneer, postInvitation, taskInviteeView, taskTaker, taskView, taskerView } from '../controller/taskController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.post('/assign-task', protectRoute, assignTask);
router.get('/assigner', protectRoute, assigneer)
router.get('/task-view', protectRoute, taskView)
router.get('/task-taker', protectRoute, taskerView)
router.post('/take-task/:id', protectRoute, taskTaker)


router.post('/invitation', protectRoute, postInvitation)
router.get('/get-Invite-task', protectRoute, taskInviteeView)


export default router
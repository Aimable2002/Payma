import express from 'express';
import { assignTask, assigneer, postInvitation, taskInviteePending, taskInviteeView, taskTaker, taskView, taskerView } from '../controller/taskController.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { applyTask, applyTask_view } from '../controller/applyController.js';


const router = express.Router();


router.post('/assign-task', protectRoute, assignTask);
router.get('/assigner', protectRoute, assigneer)
router.get('/task-view', protectRoute, taskView)
router.get('/task-taker', protectRoute, taskerView)
router.post('/take-task/:id', protectRoute, taskTaker)


router.post('/invitation', protectRoute, postInvitation)
router.get('/get-Invite-task', protectRoute, taskInviteeView)
router.get('/get-Invite-Pending_view', protectRoute, taskInviteePending)


router.post('/apply_task/:id', protectRoute, applyTask)
router.get('/apply_list', protectRoute, applyTask_view)


export default router
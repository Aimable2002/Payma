import express from 'express';
import { StatusApproval, approval } from '../controller/approvalController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.get('/apprval-statue', protectRoute, StatusApproval);
router.post('/appove', protectRoute, approval)


export default router;
import express from 'express';
import { StatusApproval, approval } from '../controller/approvalController.js';


const router = express.Router();


router.post('/apprval-statue', StatusApproval);
router.post('/appove', approval)


export default router;
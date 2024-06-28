import express from 'express';
import { assignTask, taskTaker } from '../controller/taskController.js';


const router = express.Router();


router.post('/assign-task', assignTask);
router.post('/take-task', taskTaker)


export default router
import express from 'express';
import { getHistory, getLogUser, getOnPeople, getPeople, getUsersTask } from '../controller/userController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.get('/people', protectRoute, getPeople);
router.get('/users-task', protectRoute, getUsersTask)
router.get('/onPeople', protectRoute, getOnPeople)
router.get('/history', protectRoute, getHistory)

router.get('/log/user', protectRoute, getLogUser)


export default router
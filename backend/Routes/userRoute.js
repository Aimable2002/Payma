import express from 'express';
import { getOnPeople, getPeople, getUsersTask } from '../controller/userController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.get('/people', protectRoute, getPeople);
router.get('/users-task', protectRoute, getUsersTask)
router.get('/onPeople', protectRoute, getOnPeople)


export default router
import express from 'express';
import { Report } from '../controller/reportController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.post('/report', protectRoute, Report);


export default router;
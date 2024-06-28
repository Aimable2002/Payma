import express from 'express';
import { Report } from '../controller/reportController.js';


const router = express.Router();


router.post('/report', Report);


export default router;
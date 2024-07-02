import express from 'express';
import { Withdrowal, deposite, wallet } from '../controller/walletController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();


router.post('/deposite', protectRoute, deposite);
router.post('/withdrow', protectRoute, Withdrowal);
router.get('/wallet', wallet)


export default router
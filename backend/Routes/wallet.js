import express from 'express';
import { Withdrowal, deposite, wallet } from '../controller/walletController.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { cashIn, cashOut } from '../controller/MoneyController.js';


const router = express.Router();


router.post('/deposite', protectRoute, deposite);
router.post('/cash-in', deposite)
router.post('/withdrow', protectRoute, Withdrowal);
router.get('/wallet', wallet)


export default router


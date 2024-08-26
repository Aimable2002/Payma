import express from 'express';
import { Withdrowal, deposite, wallet } from '../controller/walletController.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { cashIn, cashOut } from '../controller/MoneyController.js';
import { depo, withdro } from '../controller/Fluterwave.js';


const router = express.Router();


router.post('/deposite', protectRoute, deposite);
router.post('/cash-in', protectRoute, depo)
router.post('/withdrow', protectRoute, Withdrowal);
router.post('/cash-out', protectRoute, withdro);
router.get('/wallet', wallet)


export default router


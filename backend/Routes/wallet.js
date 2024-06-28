import express from 'express';
import { Withdrowal, deposite, wallet } from '../controller/walletController.js';


const router = express.Router();


router.post('/deposite', deposite);
router.post('/withdrow', Withdrowal);
router.get('/wallet', wallet)


export default router
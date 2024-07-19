import express from 'express';
import { login, logout, signup, googleCallback } from '../controller/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);


export default router;
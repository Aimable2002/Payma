import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { EditEmail, EditFirstName, EditLastName, EditPhone, EditTitle, EditUserName, updateAll, updatePassward } from '../controller/updateControlla.js';


const router = express.Router();

router.post('/password', protectRoute, updatePassward)
router.post('/All', protectRoute, updateAll)
router.post('/FirstName', protectRoute, EditFirstName)
router.post('/Last_name', protectRoute, EditLastName)
router.post('/UserName', protectRoute, EditUserName)
router.post('/Title', protectRoute, EditTitle)
router.post('/Email', protectRoute, EditEmail)
router.post('/Phone_number', protectRoute, EditPhone)


export default router
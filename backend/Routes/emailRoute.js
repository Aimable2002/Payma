import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import sendEmail from '../Emails/Nodemail.js';


const router = express.Router();

router.post('/confirm', protectRoute, async(req, res) => {
    try{
        const { userEmail, jobDetails } = req.body;

        const subject = 'Job Request Accepted';
        const text = `Your job request for ${jobDetails.title} has been accepted. Details: ${jobDetails.description}`;

        sendEmail(userEmail, subject, text);

        res.send({ message: 'Job request accepted and email sent.' });
    }catch(error){
        console.log('error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
})



router.post('/decline', protectRoute, async(req, res) => {
    try{
        const { userEmail, jobDetails } = req.body;

        const subject = 'Job Request Declined';
        const text = `Your job request for ${jobDetails.title} has been declined. Details: ${jobDetails.description}`;

        sendEmail(userEmail, subject, text);

        res.send({ message: 'Job request declined and email sent.' });

    }catch(error){
        console.log('error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
})


export default router
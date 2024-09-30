import connectDatabase from "../database/connectDatabase.js";
import axios from 'axios'

const connection = connectDatabase();

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY

export const depo = async (req, res) => {
    try{
        const userId = req.user.userId
        const {Amount, Phone_number} = req.body
        console.log('data :', req.body)
        if(!Amount || !Phone_number){
            return res.status(400).json('missing data')
        }
        const tx_ref = `hooli-tx-${userId}-${Date.now()}`;
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {

            tx_ref: tx_ref,
            amount: Amount,
            currency: 'RWF',
            Phone_number: Phone_number,
            payment_type: "mobilemoneyrwanda",
            redirect_url: 'http://https://payma-production.up.railway.app/dashboard',
            phone_number: Phone_number,
            email: 'aganzerizen@gmail.com',
            customer: {
                email: 'aganzerizen@gmail.com',
                Phone_number: Phone_number,
            },
            customizations: {
                title: 'Payment for items in cart',
                description: 'Payment for items in cart',
                userId: userId
            },
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
                // userId: userId
            },
        });
        console.log('response :', response.data)
        res.status(201).json(response.data)
    }catch(error){
        console.log('internal server error :', error)
        res.status(500).json({error: 'internal server error'})
    }
}




export const withdro = async (req, res) => {
    try{
        console.log('req body :', req.body)
        const {Amount, Phone_number} = req.body
        if(!Amount || !Phone_number){
            return res.status(400).json('missing data')
        }
    }catch(error){
        console.log('internal server error :', error)
        res.status(500).json({error: 'internal server error'})
    }
}
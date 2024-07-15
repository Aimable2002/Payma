import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const PPK_SECRE_ID = process.env.PPK_SECRE_ID

export const OneTimePayment = async (req, res) => {
    console.log('called :', req.body)
    const {_id: user} = req.user
    const name = req.user.userName
    console.log('name :', name)
    const { amount, email, phoneNumber, currency } = req.body;

    if(!amount || !email || !phoneNumber || !currency){
        return res.status(409).json({message: 'fill the the field'})
    }

    try {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {

            tx_ref: `hooli-tx-${Date.now()}`,
            amount: amount,
            currency: currency,
            email: email,
            name: name,
            user_id: user,
            payment_type: "mobilemoneyrwanda",
            redirect_url: 'https://website-s9ue.onrender.com/success',
            phone_number: phoneNumber,
            customer: {
                email: email,
                user_id: user,
                name: name,
            },
            customizations: {
                title: 'Payment for items in cart',
                description: 'Payment for items in cart',
            },
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(200).json({message: 'Payment successful',  data: response.data} );
        

        
    } catch (error) {
        console.error('Error creating payment link:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}





export const cashIn = async(req, res, next) => {
        console.log('called :', req.body)
        const {_id: user} = req.user
        const { Amount, Email, userName, Phone_number} = req.body;

        if(!Amount || !Email || !Phone_number || !userName){
            return res.status(409).json({message: 'fill the the field'})
        }
    try{
        const response = await axios.post('https://payments.paypack.rw/api/transactions/cashin', {
            amount: Amount,
            number: Phone_number,
            email: Email,
            userId: user,
            userName: userName
          }, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${PPK_SECRE_ID}`,
            }
          });
        console.log('response data : ', response.body)
        return res.status(200).json(response.body)
    }catch(error){
        console.log(error.message)
        return res.status(500).json(error.message)
    }
}


export const cashOut = async(req, res, next) => {
    console.log('called :', req.body)
        const {_id: user} = req.user
        const name = req.user.userName
        console.log('name :', name)
        const { amount, email, phoneNumber, currency } = req.body;

        if(!amount || !email || !phoneNumber || !currency){
            return res.status(409).json({message: 'fill the the field'})
        }
    try{
        const response = await axios.post('https://payments.paypack.rw/api/transactions/cashout', {
            amount: amount,
            number: phoneNumber,
            currency: currency,
            email: email,
            userId: user,
            userName: userName
          }, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${PPK_SECRE_ID}`,
            }
          });
        console.log(response.body)
        req.cashOutTrack = response.body
    }catch(error){
        console.log(error.message)
        return res.status(500).json(error.message)
    }
}












// var request = require("request");
// var options = {
//   method: "POST",
//   url: "https://payments.paypack.rw/api/transactions/cashin",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: "Bearer {access_token}",
//   },
//   body: JSON.stringify({
//     amount: 1000,
//     number: "078xxxxxxx",
//   }),
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });




// var request = require("request");
// var options = {
//   method: "POST",
//   url: "https://payments.paypack.rw/api/transactions/cashout",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: "Bearer {access_token}",
//   },
//   body: JSON.stringify({
//     amount: 1000,
//     number: "078xxxxxxx",
//   }),
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

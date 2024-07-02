import connectDatabase from "../database/connectDatabase.js";


const connection = connectDatabase();


export const deposite = async (req, res) => {
    try{
        const {Email, Amount, Phone_number, userName} = req.body;
        console.log('body req :', req.body)
        const USERID = req.user.userId
        console.log('userId :', USERID)
        const Currency = 'FRW'
        if(!Email || !Amount || !Phone_number || !userName || !USERID){
            console.log('missing data ')
            return res.status(400).json('missing data')
        }
        const insertDeposite = 'INSERT INTO DEPOSITE (Amount, Currency, Phone_number, userName, USERID) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertDeposite, [Amount, Currency, Phone_number, userName, USERID], async(err, result) => {
            if(err){
                console.log('error on deposite :', err)
                return res.status(400).json({err: 'error on deposite', status: false})
            }
             res.status(200).json({message: 'deposited successfully', status: true})
        })
    }catch(error){
        console.log('internal deposite server error :', error);
        res.status(500).json({error : 'internal deposite server error'})
    }
}


export const Withdrowal = async (req, res) => {
    try{
        const {Email, Amount, Phone_number, userName} = req.body;
        console.log('req body :', req.body)

        const Currency = 'FRW';
        const USERID = req.user.userId;
        console.log('userid :', USERID)
        if(!Email|| !Amount || !Phone_number || !userName || !USERID){
            console.log('missing data ')
            return res.status(400).json('missing data')
        }
        const insertWithdrowl = 'INSERT INTO WITHDROWAL (Amount, Currency, Phone_number, userName, USERID) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertWithdrowl, [Amount, Currency, Phone_number, userName, USERID], async(err, result) => {
            if(err){
                console.log('error on withdrow server :', err)
                return res.status(400).json({err: 'error on withdrowal server', status: false})
            }
            res.status(200).json({message: 'withdrowal successfull', status: true})
        })
    }catch(error){
        console.log('internal withdrowal error :', error.message)
        res.status(500).json({error: 'internal withdrowl server error'})
    }
}


export const wallet = async(req, res) => {
    try{
        const {userId} = req.body;

        if(!userId){
            console.log('missing data')
            return res.status(404).json('missing data')
        }
        const trackId = 'SELECT * FROM USERS WHERE userId = ?';
        connection.query(trackId, [userId], (err, result) => {
            if(err){
                console.log('error :', err)
                return res.status(400).json({err: 'error'})
            }
            if(result.length === 0){
                console.log('no id found')
            }
            const userid = result[0];
            console.log('userid :', userid)
            return res.status(200).json('id found')
        })
    }catch(error){
        console.log('internal server wallet error :', error.message)
        res.status(500).json({error: 'internal server wallet error'})
    }
}
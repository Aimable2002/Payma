import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();


export const deposite = async (req, res) => {
    try{
        // const cashToDeposite = req.cashInTrack
        const {Amount, Phone_number} = req.body;
        console.log('body req :', req.body)
        const USERID = req.user.userId
        const Currency = 'FRW'
        if(!Amount || !Phone_number || !USERID){
            console.log('missing data ')
            return res.status(400).json('missing data')
        }
        connection.beginTransaction(err => {
            if(err){
                throw err
            }
            const getUserName = 'SELECT userName FROM USERS WHERE userId = ?';
            connection.query(getUserName, [USERID], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(404).json('userName issue')
                    })
                }
                const userName = result[0].userName
                console.log('userName :', userName)
                const insertDeposite = 'INSERT INTO DEPOSITE (Amount, Currency, Phone_number, userName, USERID) VALUES (?, ?, ?, ?, ?)';
                connection.query(insertDeposite, [Amount, Currency, Phone_number, userName, USERID], async(err, result) => {
                    if(err){
                        console.log('error on deposite :', err)
                        return res.status(400).json({err: 'error on deposite', status: false})
                    }
                    res.status(200).json({message: 'deposited successfully', status: true})
                })
            })
        })
    }catch(error){
        console.log('internal deposite server error :', error);
        res.status(500).json({error : 'internal deposite server error'})
    }
}



export const Withdrowal = async (req, res) => {
    try{
        const {Amount, Phone_number} = req.body;
        console.log('req body :', req.body)

        const Currency = 'FRW';
        const USERID = req.user.userId;
        console.log('userid :', USERID)
        if(!Amount || !Phone_number || !USERID){
            console.log('missing data ')
            return res.status(400).json('missing data')
        }
        let fee = 0

        if(Amount <= 1000){
            fee = 10
        }else if(Amount >= 1001 && Amount <= 5000){
            fee = 150
        }else if(Amount >= 5001 && Amount <= 10000){
            fee = 350
        }else if(Amount >= 10001 && Amount <= 20000){
            fee = 450
        }else if(Amount >= 20001 && Amount <= 100000){
            fee = 600
        }else if(Amount >= 100001 && Amount <= 500000){
            fee = 1000
        }else if(Amount >= 500001 && Amount <= 1000000){
            fee = 5000
        }else if(Amount >= 1000001 && Amount <= 10000000){
            fee = 10000
        }else if (Amount >= 10000001 && Amount <= 100000000){
            fee = 20000
        }else{
            fee = 50000
        }

        const currentAmount = Amount - fee
        console.log('current amount : ', currentAmount)
        const chargedAmount = Amount - currentAmount
        console.log('charged amount : ', chargedAmount)
        const Date = Date.now()
        connection.beginTransaction(err => {
            if(err){
                throw err
            }
            const getUser = 'SELECT userName FROM USERS WHERE userId =?';
            connection.query(getUser, [USERID], (err, userResult) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(404).json('userName issue')
                    })
                }
                const userName = userResult[0].userName
                console.log('userName :', userName)

                const insertWithdrowl = 'INSERT INTO WITHDROWAL (Amount, Currency, Phone_number, userName, USERID) VALUES (?, ?, ?, ?, ?)';
                connection.query(insertWithdrowl, [Amount, Currency, Phone_number, userName, USERID], async(err, result) => {
                    if(err){
                        return connection.rollback(() => {
                            console.log('error on withdrow server :', err)
                            return res.status(400).json({err: 'error on withdrowal server', status: false})
                        })
                    }
                    const insertFee = 'INSERT INTO MY_INCOME (Date, Amount) VALUES (?, ?)';
                    connection.query(insertFee, [Date, chargedAmount], (err, insertedFee) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(400).json('issue with inserting fee')
                            })
                        }
                    
                        connection.commit(err => {
                            if(err){
                                return connection.rollback(() => {
                                    return res.status(400).json('can not commit')
                                })
                            }
                            res.status(200).json({message: 'withdrowal successfull', status: true})
                        })
                    })
                })
            })
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



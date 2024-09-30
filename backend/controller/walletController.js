import connectDatabase from "../database/connectDatabase.js";
import nodemailer from 'nodemailer';

const connection = connectDatabase();


export const deposite = async (req, res) => {
    try{
        // const cashToDeposite = req.cashInTrack
        // const {Amount, Phone_number} = req.body;
        console.log('body req payload :', payload)
        // connection.beginTransaction(err => {
        //     if(err){
        //         throw err
        //     }
        //     const getUserName = 'SELECT userName, EMAIL FROM USERS WHERE userId = ?';
        //     connection.query(getUserName, [USERID], (err, result) => {
        //         if(err){
        //             return connection.rollback(() => {
        //                 return res.status(404).json('userName issue')
        //             })
        //         }
        //         const userName = result[0].userName
        //         const userEmail = result[0].EMAIL 
        //         console.log('user Email :', userEmail)
        //         console.log('userName :', userName)
        //         const insertDeposite = 'INSERT INTO DEPOSITE (Amount, Currency, Phone_number, userName, USERID) VALUES (?, ?, ?, ?, ?)';
        //         connection.query(insertDeposite, [Amount, Currency, Phone_number, userName, USERID], async(err, result) => {
        //             if(err){
        //                 console.log('error on deposite :', err)
        //                 return res.status(400).json({err: 'error on deposite', status: false})
        //             }
        //             let transporter = nodemailer.createTransport({
        //                 service: 'gmail',
        //                 auth: {
        //                     user: process.env.EMAIL_USER,
        //                     pass: process.env.EMAIL_PASS
        //                 }
        //             });
    
        //             let mailOptions = {
        //                 from: process.env.EMAIL_USER,
        //                 to: userEmail,
        //                 subject: 'Cash In Complete',
        //                 text: 'deposite done. Thank you for using our website'
        //             };
    
        //             transporter.sendMail(mailOptions, (error, info) => {
        //                 if (error) {
        //                     console.log(error);
        //                 } else {
        //                     console.log('Email sent: ' + info.response);
        //                 }
        //             });

        //             res.status(200).json({message: 'deposited successfully', status: true})
        //         })
        //     })
        // })
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
        const CurrentDate = Date.now()
        connection.beginTransaction(err => {
            if(err){
                throw err
            }
            const getUser = 'SELECT userName, EMAIL FROM USERS WHERE userId =?';
            connection.query(getUser, [USERID], (err, userResult) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(404).json('userName issue')
                    })
                }
                const userName = userResult[0].userName
                const userEmail = userResult[0].EMAIL
                console.log('user email :', userEmail)
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
                    connection.query(insertFee, [CurrentDate, chargedAmount], (err, insertedFee) => {
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
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL_USER,
                                    pass: process.env.EMAIL_PASS
                                }
                            });
            
                            let mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: userEmail,
                                subject: 'Cash Out Complete',
                                text: 'cash out complete. Thank you for using our website'
                            };
            
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });

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



// import connectDatabase  from "../database/connectDatabase.js";
// import nodemailer from 'nodemailer';

// const pool = connectDatabase();

// export const deposite = async (req, res) => {
//   try {
//     const { Amount, Phone_number } = req.body;
//     const USERID = req.user.userId;
//     const Currency = 'FRW';

//     if (!Amount || !Phone_number || !USERID) {
//       return res.status(400).json('missing data');
//     }

//     const client = await pool.connect();

//     try {
//       await client.query('BEGIN');

//       const getUserQuery = 'SELECT "userName", "EMAIL" FROM "USERS" WHERE "userId" = $1';
//       const userResult = await client.query(getUserQuery, [USERID]);

//       if (userResult.rows.length === 0) {
//         throw new Error('User not found');
//       }

//       const { userName, EMAIL: userEmail } = userResult.rows[0];

//       const insertDepositeQuery = `
//         INSERT INTO "DEPOSITE" ("Amount", "Currency", "Phone_number", "userName", "USERID") 
//         VALUES ($1, $2, $3, $4, $5)
//       `;
//       await client.query(insertDepositeQuery, [Amount, Currency, Phone_number, userName, USERID]);

//       let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS
//         }
//       });

//       let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: userEmail,
//         subject: 'Cash In Complete',
//         text: 'Deposit done. Thank you for using our website'
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });

//       await client.query('COMMIT');
//       res.status(200).json({ message: 'Deposited successfully', status: true });
//     } catch (err) {
//       await client.query('ROLLBACK');
//       console.log('Transaction failed: ', err);
//       res.status(400).json({ err: 'Error on deposit', status: false });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.log('Internal deposit server error:', error.message);
//     res.status(500).json({ error: 'Internal deposit server error' });
//   }
// };

// export const Withdrowal = async (req, res) => {
//   try {
//     const { Amount, Phone_number } = req.body;
//     const USERID = req.user.userId;
//     const Currency = 'FRW';

//     if (!Amount || !Phone_number || !USERID) {
//       return res.status(400).json('missing data');
//     }

//     let fee = calculateFee(Amount);
//     const currentAmount = Amount - fee;
//     const chargedAmount = Amount - currentAmount;
//     const CurrentDate = new Date();

//     const client = await pool.connect();

//     try {
//       await client.query('BEGIN');

//       const getUserQuery = 'SELECT "userName", "EMAIL" FROM "USERS" WHERE "userId" = $1';
//       const userResult = await client.query(getUserQuery, [USERID]);

//       if (userResult.rows.length === 0) {
//         throw new Error('User not found');
//       }

//       const { userName, EMAIL: userEmail } = userResult.rows[0];

//       const insertWithdrawalQuery = `
//         INSERT INTO "WITHDROWAL" ("Amount", "Currency", "Phone_number", "userName", "USERID") 
//         VALUES ($1, $2, $3, $4, $5)
//       `;
//       await client.query(insertWithdrawalQuery, [Amount, Currency, Phone_number, userName, USERID]);

//       const insertFeeQuery = `
//         INSERT INTO "MY_INCOME" ("Date", "Amount") 
//         VALUES ($1, $2)
//       `;
//       await client.query(insertFeeQuery, [CurrentDate, chargedAmount]);

//       await client.query('COMMIT');

//       let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS
//         }
//       });

//       let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: userEmail,
//         subject: 'Cash Out Complete',
//         text: 'Cash out complete. Thank you for using our website'
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });

//       res.status(200).json({ message: 'Withdrawal successful', status: true });
//     } catch (err) {
//       await client.query('ROLLBACK');
//       console.log('Transaction failed: ', err);
//       res.status(400).json({ err: 'Error on withdrawal', status: false });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.log('Internal withdrawal error:', error.message);
//     res.status(500).json({ error: 'Internal withdrawal server error' });
//   }
// };

// export const wallet = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json('missing data');
//     }

//     const query = 'SELECT * FROM "USERS" WHERE "userId" = $1';
//     const result = await pool.query(query, [userId]);

//     if (result.rows.length === 0) {
//       return res.status(404).json('no user found');
//     }

//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.log('Internal wallet error:', error.message);
//     res.status(500).json({ error: 'Internal server wallet error' });
//   }
// };

// function calculateFee(amount) {
//   if (amount <= 1000) return 10;
//   if (amount <= 5000) return 150;
//   if (amount <= 10000) return 350;
//   if (amount <= 20000) return 450;
//   if (amount <= 100000) return 600;
//   if (amount <= 500000) return 1000;
//   if (amount <= 1000000) return 5000;
//   if (amount <= 10000000) return 10000;
//   return 50000;
// }


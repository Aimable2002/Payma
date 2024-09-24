import connectDatabase from "../database/connectDatabase.js";
import nodemailer from 'nodemailer';


const connection = connectDatabase();


export const StatusApproval = async (req, res) => {
    try{
        //const {taskId} = req.body;
        const task_giverId = req.user.userId

        // if(!taskId){
        //     console.log('missing data');
        //     return res.Status(400).json('missing data')
        // }
        const CheckApproval = 'SELECT * FROM USERS_TASK_VIEW WHERE Status = ? AND task_giverId = ?';

        connection.query(CheckApproval, ['Reported', task_giverId], (err, result) => {
            if(err){
                console.log('error inserting approval data :', err)
                return res.Status(400).json({err: 'error inserting approval data'})
            }

            if (result.length > 0) {
                return res.status(200).json(result);
            }
        })
    }catch(error){
        console.log('internal server approval error :', error.message)
        res.status(500).json({error: 'internal server approval error'})
    }
}




export const approval = async (req, res) => {
    try{
        const {Status, taskId} = req.body;
        const USERID = req.user.userId;
        if(!Status || !taskId || !USERID){
            return res.status(300).json('missing data')
        }
        
        if(Status !== 'Reported'){
            return res.status(403).json('task is not yet reported')
        }
        
        else if(Status === 'Reported'){
            connection.beginTransaction(err => {
                if(err){
                    console.error('Transaction error:', err);
                    return res.status(500).json({ error: 'Transaction error' });
                }

                const tracktaskId = 'SELECT * FROM task WHERE taskId = ? AND Status = ? AND task_giverId = ?';
                
                connection.query(tracktaskId, [taskId, 'Reported', USERID], async(err, result) => {
                    if(err){

                        return connection.rollback(() => {
                            console.log('error tracking report :', err)
                            return res.status(400).json({err: 'error tracking report'})
                        })
                    }
                    if (result.length === 0) {
                        return connection.rollback(() => {
                            res.status(404).json({ error: 'Task not found for approval' });
                        });
                    }
                    if(result[0].Approval === 'Approved'){
                        return connection.rollback(() => {
                            console.log('result :', result[0].Approval === 'Approved')
                            return res.status(304).json('task approved already')
                        })
                    }
                    console.log('result22', result[0].Approval === 'Approve')
                    const taskAmount = result[0].Amount;
                    
                    const taskTakerId = result[0].task_takerId;
                    console.log('taker :', taskTakerId)

                    if (isNaN(taskAmount)) {
                        return connection.rollback(() => {
                            console.log('Invalid task amount:', taskAmount);
                            return res.status(407).json('Invalid task amount');
                        });
                    }
                    const selectUser = 'SELECT Balance, Earnings FROM USERS WHERE userId = ?';
                    connection.query(selectUser, [taskTakerId], (err, result) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(408).json('something went wrong')
                            })
                        }

                        const OLDBALANCE = result[0].Balance;
                        console.log('old balance :', OLDBALANCE)
                        const OLDEARNINGS = result[0].Earnings;
                        console.log('old earnings :', OLDEARNINGS)
                        const totalE = taskAmount + OLDEARNINGS
                        console.log('total E :', totalE)
                        const totalB = taskAmount + OLDBALANCE
                        console.log('total B :', totalB)

                    const updateApproval = 'UPDATE task SET Approval = ? WHERE taskId = ? AND Status = ? AND task_giverId = ?';
                    connection.query(updateApproval, ['Approved', taskId, 'Reported', USERID], (err, result) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(402).json('something went wrong')
                            })
                        }
                    const updateUserBalance = 'UPDATE USERS SET Balance = ? , Earnings = ? WHERE userId = ?';
                    connection.query(updateUserBalance, [totalB, totalE, taskTakerId], (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                return res.status(406).json('something went wrong updating user balance');
                            });
                            
                        }
                        console.log('amount :', taskAmount)
                        console.log('taker :', taskTakerId)
                        // const resetTaskAmount = 'UPDATE TASK SET amount = 0 WHERE taskId = ?';
                        // connection.query(resetTaskAmount, [taskId], (err, result) => {
                        //     if (err) {
                        //         return connection.rollback(() => {
                        //             return res.status(400).json('something went wrong resetting task amount');
                        //         });
                        //     }

                        const GetTaskTakerEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
                        connection.query(GetTaskTakerEmail, [taskTakerId], (err, resultEmail) => {
                            if(err){
                                return connection.rollback(() => {
                                    return res.status(408).json('can not get email')
                                })
                            }

                            const EmailTaker = resultEmail[0].EMAIL 
                        
                        
                            connection.commit(err => {
                                if (err) {
                                    return connection.rollback(() => {
                                        throw err;
                                    });
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
                                    to: EmailTaker,
                                    subject: 'Task Approved',
                                    text: 'Your Task has been approved visit app for more details.'
                                };
        
                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
    
                                res.status(200).json({message: 'tast Approved', status: true});
                                })
                            })
                        });

                    })
                })
                })
            })
        }else{
            res.status(400).json({error: 'task is not yet reported'})
        }
    }catch(error){
        console.log('internal server approval error :', error.message)
        res.status(500).json({error: 'internal server approval error'})
    }
}



// import pool from '../database/connectDatabase.js';
// import nodemailer from 'nodemailer';

// export const approval = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const { Status, taskId } = req.body;
//         const USERID = req.user.userId;

//         if (!Status || !taskId || !USERID) {
//             return res.status(400).json('Missing data');
//         }

//         if (Status !== 'Reported') {
//             return res.status(403).json('Task is not yet reported');
//         }

//         await client.query('BEGIN');

//         const trackTaskQuery = 'SELECT * FROM TASK WHERE taskId = $1 AND Status = $2 AND task_giverId = $3';
//         const result = await client.query(trackTaskQuery, [taskId, 'Reported', USERID]);

//         if (result.rows.length === 0) {
//             await client.query('ROLLBACK');
//             return res.status(404).json('Task not found for approval');
//         }

//         if (result.rows[0].Approval === 'Approved') {
//             await client.query('ROLLBACK');
//             return res.status(304).json('Task already approved');
//         }

//         const taskAmount = result.rows[0].Amount;
//         const taskTakerId = result.rows[0].task_takerId;

//         if (isNaN(taskAmount)) {
//             await client.query('ROLLBACK');
//             return res.status(407).json('Invalid task amount');
//         }

//         const selectUserQuery = 'SELECT Balance, Earnings FROM USERS WHERE userId = $1';
//         const userResult = await client.query(selectUserQuery, [taskTakerId]);

//         const OLDBALANCE = userResult.rows[0].Balance;
//         const OLDEARNINGS = userResult.rows[0].Earnings;

//         const totalE = taskAmount + OLDEARNINGS;
//         const totalB = taskAmount + OLDBALANCE;

//         const updateApprovalQuery = 'UPDATE TASK SET Approval = $1 WHERE taskId = $2 AND Status = $3 AND task_giverId = $4';
//         await client.query(updateApprovalQuery, ['Approved', taskId, 'Reported', USERID]);

//         const updateUserBalanceQuery = 'UPDATE USERS SET Balance = $1, Earnings = $2 WHERE userId = $3';
//         await client.query(updateUserBalanceQuery, [totalB, totalE, taskTakerId]);

//         const getTaskTakerEmailQuery = 'SELECT EMAIL FROM USERS WHERE userId = $1';
//         const emailResult = await client.query(getTaskTakerEmailQuery, [taskTakerId]);

//         const EmailTaker = emailResult.rows[0].EMAIL;

//         await client.query('COMMIT');

//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         let mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: EmailTaker,
//             subject: 'Task Approved',
//             text: 'Your Task has been approved. Visit the app for more details.',
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log('Error sending email:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         res.status(200).json({ message: 'Task Approved', status: true });

//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.log('Internal server approval error:', error.message);
//         res.status(500).json({ error: 'Internal server approval error' });
//     } finally {
//         client.release();
//     }
// };


// export const StatusApproval = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const task_giverId = req.user.userId;

//         const checkApprovalQuery = 'SELECT * FROM USERS_TASK_VIEW WHERE Status = $1 AND task_giverId = $2';
//         const result = await client.query(checkApprovalQuery, ['Reported', task_giverId]);

//         if (result.rows.length > 0) {
//             return res.status(200).json(result.rows);
//         } else {
//             return res.status(404).json('No records found');
//         }
//     } catch (error) {
//         console.log('Internal server approval error:', error.message);
//         res.status(500).json({ error: 'Internal server approval error' });
//     } finally {
//         client.release();
//     }
// };



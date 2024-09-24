import nodemailer from 'nodemailer';
import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();
// const pool = connectDatabase()

export const assignTask = async (req, res) => {
    try{
        const {Agreement, Start_date, End_date, Duration, Amount, Description, Specification} = req.body;
        console.log('req.body :', req.body)
        const task_giverId = req.user.userId
        console.log('Duration :', Duration)
        const formattedDuration = `${Duration} Day${Duration > 1 ? 's' : ''}`;
        if(!Agreement || !Start_date || !End_date || !Amount || !task_giverId || !Description || !Specification){
            return res.status(409).json('missing data')
        }
        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }
            const checkBalance = 'SELECT Balance FROM USERS WHERE userId = ?';
            connection.query(checkBalance, [task_giverId], async(err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log('error:', err);
                        res.status(400).json({ err: 'error' });
                    });
                }
                const bal = result[0].Balance
                console.log('bal :', bal)
                if(bal < Amount){
                    return res.status(303).json({message: 'low balance'})
                }else{
                // return res.status(200).json({message: 'task inserted', status: true})
                const insertTask = 'INSERT INTO task (Agreement, Start_date, End_date, Amount, Duration, task_giverId, Description, Specification) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(insertTask, [Agreement, Start_date, End_date, Amount, formattedDuration, task_giverId, Description, Specification], async(err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log('Error inserting task:', err);
                            res.status(400).json({ err: 'Error inserting task' });
                        });
                    }
                    // return res.status(200).json({message: 'task inserted', status: true})
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                throw err;
                            });
                        }
                        res.status(200).json({message: 'task inserted', status: true});
                    });
                })
            }
            })
            
        })
    }catch(error){
        console.log('internal task server error :', error.message);
        res.status(500).json({error: 'internal server task error'})
    }
}


export const assigneer = async (req, res) => {
    try{
        const USERID = req.user.userId;
        const findAssigneer = 'SELECT * FROM task WHERE task_giverId = ?';
        connection.query(findAssigneer, [USERID], (err, result) => {
            if(err){
                throw err
            }
            if(result.lenght === 0){
                return res.status(404).json('Not yet assigned task')
            }
            //console.log('results :', result)
            return res.status(200).json(result[0])

        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

export const taskView = async (req, res) => {
    try{
        const USERID = req.user.userId;
        const findAssigneer = 'SELECT * FROM USERS_TASK_VIEW WHERE task_giverId = ?';
        connection.query(findAssigneer, [USERID], (err, result) => {
            if(err){
                console.log('error on server :', err)
                return res.status(400).json({err: 'error on server', status: false})
            }
            if(result.lenght === 0){
                return res.status(404).json('Not yet assigned task')
            }
            //console.log('results :', result)
            return res.status(200).json(result)

        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

export const taskerView = async (req, res) => {
    try{
        const USERID = req.user.userId;
        //console.log('dashboard user :', USERID)
        const findAssigneer = 'SELECT * FROM USERS_TASK_VIEW WHERE task_takerId = ? AND Approval = ?';
        connection.query(findAssigneer, [USERID, "Approve"], (err, result) => {
            if(err){
                throw err
            }
            if(result.lenght === 0){
                return res.status(404).json('Not yet assigned task')
            }
            //console.log('results :', result)
            return res.status(200).json(result)

        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

export const taskGiverView = async (req, res) => {
    try{

    }catch(error){
        console.log('internal server error :', error.message)

        return res.status(500).json({error: 'internal server error'})
    }
}

export const taskTaker = async (req, res) => {
    try {
        const {taskId, APPLYING_USERNAME} = req.body;
        const ConfirmId = req.user.userId
         if (!taskId || !ConfirmId ) {
             return res.status(404).json('Missing data');
         }

        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }
            const checkTask = 'SELECT task_giverId, task_takerId FROM task WHERE taskId = ?';
            connection.query(checkTask, [taskId], async (err, result) => {
            if(err){
                console.log(401).json({error: 'error'})
            }
            if (result.length === 0) {
                console.log('No task found');
                return res.status(404).json('No task found');
            }
            if(result[0].task_takerId !== null){
                return res.status(501).json('task taken already')
            }
            if(ConfirmId !== result[0].task_giverId){
                return res.status(401).json('u cant confirm')
            }
            const getName = 'SELECT userId FROM USERS WHERE userName = ?';
            connection.query(getName, [APPLYING_USERNAME], (err, results) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(400).json('some issue occur')
                    })
                }
                const taker_Id = results[0].userId
                console.log('taker_name :', taker_Id)
                if(taker_Id === result[0].task_giverId){
                    console.log('equalize :', taker_Id === result[0].task_giverId)
                    return res.status(502).json('u cant take your own task')
                }
            
            const insertTaskTaker = 'INSERT INTO task_taker (taskId, takerId) VALUES (?, ?)';
            connection.query(insertTaskTaker, [taskId, taker_Id], (err, insertResult) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log('Error inserting task taker:', err);
                        return res.status(403).json({ err: 'Error taking task' });
                    });
                }

                const updateTask = 'UPDATE task SET task_takerId = ?, Task_status= ?, task_taker_name= ? WHERE taskId = ?';
                connection.query(updateTask, [taker_Id, 'Taken', APPLYING_USERNAME, taskId], (err, updateResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log('Error updating task:', err);
                            return res.status(400).json({ err: 'Error updating task' , status: false});
                        });
                    }

                    const getTakerEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
                    connection.query(getTakerEmail, [taker_Id], (err, resultTakerEmail) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(408).json('cant get email')
                            })
                        }

                        const TakerEmail = resultTakerEmail[0].EMAIL

                    
                
                            const updateApplyTask = 'UPDATE apply_task SET Apply_Status = ? WHERE taskId = ? AND task_giverId = ? AND applying_user = ?';
                            connection.query(updateApplyTask, ['Taken', taskId, ConfirmId, taker_Id], (err, result) => {
                                if(err){
                                    return connection.rollback(() => {
                                        console.log('fail to update apply task')
                                        return res.status(400).json('fail to update apply task')
                                    })
                                }
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
                                    to: TakerEmail,
                                    subject: 'Task Confrimation',
                                    text: 'Your request has been confirmed you can vist website for more details'
                                };
                
                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                            return res.status(200).json({message: 'tast taken', status: true});
                        });
                    })
                })
                });
            });
        })
        })
        });
    } catch (error) {
        console.log('Internal task taker server error:', error.message);
        res.status(500).json({ error: 'Internal task taker server error' });
    }
};


// import nodemailer from 'nodemailer';
// import pool from "../database/connectDatabase.js";

// export const assignTask = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const { Agreement, Start_date, End_date, Duration, Amount, Description, Specification } = req.body;
//         const task_giverId = req.user.userId;
//         const formattedDuration = `${Duration} Day${Duration > 1 ? 's' : ''}`;

//         if (!Agreement || !Start_date || !End_date || !Amount || !task_giverId || !Description || !Specification) {
//             return res.status(409).json('Missing data');
//         }

//         await client.query('BEGIN');
        
//         const { rows: [{ balance }] } = await client.query('SELECT Balance FROM USERS WHERE userId = $1', [task_giverId]);

//         if (balance < Amount) {
//             await client.query('ROLLBACK');
//             return res.status(303).json({ message: 'Low balance' });
//         }

//         await client.query(
//             'INSERT INTO TASK (Agreement, Start_date, End_date, Amount, Duration, task_giverId, Description, Specification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
//             [Agreement, Start_date, End_date, Amount, formattedDuration, task_giverId, Description, Specification]
//         );

//         await client.query('COMMIT');
//         res.status(200).json({ message: 'Task inserted', status: true });
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.log('Internal task server error:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     } finally {
//         client.release();
//     }
// };

// export const assigneer = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const USERID = req.user.userId;
//         const { rows: result } = await client.query('SELECT * FROM TASK WHERE task_giverId = $1', [USERID]);

//         if (result.length === 0) {
//             return res.status(404).json('No assigned tasks');
//         }

//         return res.status(200).json(result);
//     } catch (error) {
//         console.log('Internal server error:', error.message);
//         return res.status(500).json({ error: 'Internal server error' });
//     } finally {
//         client.release();
//     }
// };

// export const taskView = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const USERID = req.user.userId;
//         const { rows: result } = await client.query('SELECT * FROM USERS_TASK_VIEW WHERE task_giverId = $1', [USERID]);

//         if (result.length === 0) {
//             return res.status(404).json('No assigned tasks');
//         }

//         return res.status(200).json(result);
//     } catch (error) {
//         console.log('Internal server error:', error.message);
//         return res.status(500).json({ error: 'Internal server error' });
//     } finally {
//         client.release();
//     }
// };

// export const taskerView = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const USERID = req.user.userId;
//         const { rows: result } = await client.query('SELECT * FROM USERS_TASK_VIEW WHERE task_takerId = $1 AND Approval = $2', [USERID, "Approve"]);

//         if (result.length === 0) {
//             return res.status(404).json('No assigned tasks');
//         }

//         return res.status(200).json(result);
//     } catch (error) {
//         console.log('Internal server error:', error.message);
//         return res.status(500).json({ error: 'Internal server error' });
//     } finally {
//         client.release();
//     }
// };

// export const taskGiverView = async (req, res) => {
//     // Add implementation if needed
// };

// export const taskTaker = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const { taskId, APPLYING_USERNAME } = req.body;
//         const ConfirmId = req.user.userId;

//         if (!taskId || !ConfirmId) {
//             return res.status(404).json('Missing data');
//         }

//         await client.query('BEGIN');

//         const { rows: [task] } = await client.query('SELECT task_giverId, task_takerId FROM TASK WHERE taskId = $1', [taskId]);

//         if (!task) {
//             await client.query('ROLLBACK');
//             return res.status(404).json('No task found');
//         }

//         if (task.task_takerId !== null) {
//             await client.query('ROLLBACK');
//             return res.status(501).json('Task already taken');
//         }

//         if (ConfirmId !== task.task_giverId) {
//             await client.query('ROLLBACK');
//             return res.status(401).json('You cannot confirm');
//         }

//         const { rows: [{ userId: takerId }] } = await client.query('SELECT userId FROM USERS WHERE userName = $1', [APPLYING_USERNAME]);

//         if (takerId === task.task_giverId) {
//             await client.query('ROLLBACK');
//             return res.status(502).json('You cannot take your own task');
//         }

//         await client.query('INSERT INTO TASK_TAKER (taskId, takerId) VALUES ($1, $2)', [taskId, takerId]);
//         await client.query('UPDATE TASK SET task_takerId = $1, Task_status = $2, task_taker_name = $3 WHERE taskId = $4', [takerId, 'Taken', APPLYING_USERNAME, taskId]);

//         const { rows: [{ EMAIL: takerEmail }] } = await client.query('SELECT EMAIL FROM USERS WHERE userId = $1', [takerId]);

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: takerEmail,
//             subject: 'Task Confirmation',
//             text: 'Your request has been confirmed. You can visit the website for more details.',
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });

//         await client.query('UPDATE APPLY_TASK SET Apply_Status = $1 WHERE taskId = $2 AND task_giverId = $3 AND applying_user = $4', ['Taken', taskId, ConfirmId, takerId]);

//         await client.query('COMMIT');
//         res.status(200).json({ message: 'Task taken', status: true });
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.log('Internal task taker server error:', error.message);
//         res.status(500).json({ error: 'Internal task taker server error' });
//     } finally {
//         client.release();
//     }
// };



// export const DeclineRequest = async (req, res) => {
//     try{
//         const { taskId, APPLYING_USERNAME } = req.body;
//         const DeclinedId = req.user.userId;
  
//         if (!taskId || !APPLYING_USERNAME) {
//         return res.status(404).json('Missing data');
//         }
  
//         connection.beginTransaction(err => {
//             if (err) {
//                 return res.status(500).json({ error: 'Transaction start error' });
//             }
  
//             const checkTask = 'SELECT task_giverId, task_takerId FROM TASK WHERE taskId = ?';
//             connection.query(checkTask, [taskId], (err, result) => {
//                 if (err) {
//                     return connection.rollback(() => {
//                         return res.status(400).json({ error: 'Error checking task' });
//                     });
//                 }
  
//                 if (result.length === 0) {
//                     return connection.rollback(() => {
//                         return res.status(404).json('No task found');
//                     });
//                 }
  
//                 if (DeclinedId !== result[0].task_giverId) {
//                     return connection.rollback(() => {
//                         return res.status(401).json('You cannot decline ');
//                     });
//                 }
  
//             const getName = 'SELECT userId FROM USERS WHERE userName = ?';
//             connection.query(getName, [APPLYING_USERNAME], (err, results) => {
//                 if (err) {
//                     return connection.rollback(() => {
//                         return res.status(400).json('Some issue occurred');
//                     });
//                 }
  
//                 if (results.length === 0) {
//                     return connection.rollback(() => {
//                         return res.status(404).json('User not found');
//                     });
//                 }
  
//                 const taker_Id = results[0].userId;
//                 if (taker_Id === result[0].task_giverId) {
//                     return connection.rollback(() => {
//                         return res.status(400).json('You cannot Decline your own task');
//                     });
//                 }
  
//             const updateApplyTask = 'UPDATE APPLY_TASK SET Apply_Status = ? WHERE taskId = ? AND task_giverId = ? AND applying_user = ?';
//             connection.query(updateApplyTask, ['Declined', taskId, DeclinedId, taker_Id], (err, result) => {
//                 if (err) {
//                     return connection.rollback(() => {
//                         return res.status(400).json('Failed to update apply task');
//                     });
//                 }

//             const getApplyedEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
//             connection.query(getApplyedEmail, [taker_Id], (err, AppliedEmail) => {
//                 if(err){
//                     return connection.rollback(() => {
//                         return res.status(406).json('can not get Email')
//                     })
//                 }

//                 const EmailApply = AppliedEmail[0].EMAIL
//                 console.log('EmailApply :', EmailApply)
            
  
//                 connection.commit(err => {
//                 if (err) {
//                     return connection.rollback(() => {
//                     return res.status(500).json('Transaction commit error');
//                     });
//                 }

//                 let transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: process.env.EMAIL_USER,
//                         pass: process.env.EMAIL_PASS
//                     }
//                 });

//                 let mailOptions = {
//                     from: process.env.EMAIL_USER,
//                     to: EmailApply,
//                     subject: 'Task Invitation',
//                     text: 'Your request has been declined visite the app for more details'
//                 };

//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         console.log('Email sent: ' + info.response);
//                     }
//                 });
//                 return res.status(200).json({ message: 'Successfully declined', status: true });
//                 });
//             })
//           });
//         });
//       });
//     });
// }catch(error){
//     console.log('internal server error :', error)
//     res.status(500).json({error: 'internal server error'})
// }
// }


  

// export const taskTakerView = async(req, res) => {
//     try{
//         const {taskId} = req.body
//         const takerId = req.user.userId;
//         if(!taskId || !takerId){
//             return res.status(401).json('missing data')
//         }
//         const selectTakerId = 'SELECT * FROM USERS_TASK_VIEW WHERE taskId = ? && task_takerId = ?';
//         connection.query(selectTakerId, [taskId, takerId], (err, result) => {
//             if(err){
//                 console.log('error :', err.message)
//                 return res.status(400).json({err: 'error'})
//             }
//             if(result.lenght === 0){
//                 return res.status(201).json({message: 'No task taken yet'})
//             }
//             const tasks = result;
//             return res.status(200).json(tasks)
//         })
//     }catch(error){
//         console.log('internal server error :', error.message)
//         return res.status(500).json({error: 'internal serer error'})
//     }
// }




// export const postInvitation = async (req, res) => {
//     try{
//         const GiverId = req.user.userId

//         const {TakerId, Taker_Name, Agreement, Description, Amount, Start_date, End_date} = req.body

//         if(!TakerId || !Taker_Name || !Agreement || !Description || !Amount || !Start_date || !End_date){
//             console.log('missing data')
//             return res.status(400).json({message: 'missing data', status: false})
//         }

//         connection.beginTransaction(err => {
//             if(err){
//                 throw new Error (err)
//             }

//             const getInvittingUser = 'SELECT * FROM USERS WHERE userId = ?'
//             connection.query(getInvittingUser, [GiverId], (err, result) => {
//                 if(err){
//                     return connection.rollback(() => {
//                         console.log('error :', err.message)
//                         return res.status(404).json({message: 'user data missing', status: false})
//                     })
//                 }
//                 console.log('result :', result)
//                 const inviter = result[0].userName
//                 console.log('userData :', inviter)
//                 console.log( 'bal :', result[0].Balance)
//                 console.log('check bal :', result[0].Balance < Amount)
//                 if(result[0].Balance < Amount){
//                     return connection.rollback(() => {
//                         return res.status(400).json({message: 'insufficient Amount', status: false})
//                     })
//                 }

//                 const insertInviteData = 'INSERT INTO invitee (invitee, inviter, Agreement, Description, Start_date, End_date, Amount, inviterId, TakerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//                 connection.query(insertInviteData, [Taker_Name, inviter, Agreement, Description, Start_date, End_date, Amount, GiverId, TakerId], (err, result) => {
//                     if(err){
//                         return connection.rollback(() => {
//                             console.log('error :', err.message)
//                             return res.status(409).json({err: 'error'})
//                         })
//                     }
//                     const substractAmount = 'UPDATE USERS SET Balance = Balance - ? WHERE userId = ?';
//                     connection.query(substractAmount, [Amount, GiverId], (err, subResult) => {
//                         if(err){
//                             return connection.rollback(() => {
//                                 return res.status(303).json(err.message)
//                             })
//                         }
//                         const getTakerName = 'SELECT EMAIL FROM USERS WHERE userId = ?';
//                         connection.query(getTakerName, [TakerId], (err, TakerEma) => {
//                             if(err){
//                                 return connection.rollback(() => {
//                                     return res.status(408).json('can not get Email')
//                                 })
//                             }
//                             const EmailTaker = TakerEma[0].EMAIL
//                             console.log('emailTaker :', EmailTaker)
                    
                    
//                             connection.commit(err => {
//                                 if(err){
//                                     return connection.rollback(() => {
//                                         console.log('fail to commit :', err.message)
//                                         return res.status(409).json({message: 'fail to commit :', status: false})
//                                     })
//                                 }

//                             let transporter = nodemailer.createTransport({
//                                 service: 'gmail',
//                                 auth: {
//                                     user: process.env.EMAIL_USER,
//                                     pass: process.env.EMAIL_PASS
//                                 }
//                             });
    
//                             let mailOptions = {
//                                 from: process.env.EMAIL_USER,
//                                 to: EmailTaker,
//                                 subject: 'Task Invitation',
//                                 text: 'You have been invited on Task, check on app and confirm'
//                             };
    
//                             transporter.sendMail(mailOptions, (error, info) => {
//                                 if (error) {
//                                     console.log(error);
//                                 } else {
//                                     console.log('Email sent: ' + info.response);
//                                 }
//                             });
//                             return res.status(200).json({message: 'successfully invited', status: true})
//                         })
//                     })
//                 })
//             })
//         })
//     })
// }catch(error){
//     console.log('internal server error :', error)
//     res.status(500).json({error: 'internal server error'})
// }
// }


// export const taskInviteeView = async (req, res) => {
//     const USERID = req.user.userId
//     //console.log('userId :', USERID)
//     const selectTask = 'SELECT * FROM INVITEE_VIEW WHERE TakerId = ? AND Approval = ?';
//     connection.query(selectTask, [USERID, "Approve"], (err, result) => {
//         if(err){
//             console.log('error :', err.message)
//             return res.status(409).json({message: 'error', status: false})
//         }
//         if(result.lenght === 0){
//             return res.status(404).json({message: 'No task found', status: false})
//         }
//         const data = result
//         //console.log('data :', data)
//         return res.status(200).json(data)
//     })
// }

// export const DeclineRequest = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const { taskId, APPLYING_USERNAME } = req.body;
//         const DeclinedId = req.user.userId;

//         if (!taskId || !APPLYING_USERNAME) {
//             return res.status(400).json({ message: 'Missing data', status: false });
//         }

//         await client.query('BEGIN');

//         // Check if the task exists and the requester is the task giver
//         const checkTask = `
//             SELECT task_giverId, task_takerId 
//             FROM TASK 
//             WHERE taskId = $1
//         `;
//         const { rows: taskRows } = await client.query(checkTask, [taskId]);

//         if (taskRows.length === 0) {
//             await client.query('ROLLBACK');
//             return res.status(404).json({ message: 'No task found', status: false });
//         }

//         if (DeclinedId !== taskRows[0].task_giverId) {
//             await client.query('ROLLBACK');
//             return res.status(403).json({ message: 'You cannot decline this task', status: false });
//         }

//         // Get the userId of the applying user
//         const getName = `
//             SELECT userId 
//             FROM USERS 
//             WHERE userName = $1
//         `;
//         const { rows: userRows } = await client.query(getName, [APPLYING_USERNAME]);

//         if (userRows.length === 0) {
//             await client.query('ROLLBACK');
//             return res.status(404).json({ message: 'User not found', status: false });
//         }

//         const takerId = userRows[0].userId;

//         if (takerId === taskRows[0].task_giverId) {
//             await client.query('ROLLBACK');
//             return res.status(400).json({ message: 'You cannot decline your own task', status: false });
//         }

//         // Update the apply task status
//         const updateApplyTask = `
//             UPDATE APPLY_TASK 
//             SET Apply_Status = $1 
//             WHERE taskId = $2 AND task_giverId = $3 AND applying_user = $4
//         `;
//         await client.query(updateApplyTask, ['Declined', taskId, DeclinedId, takerId]);

//         // Get the email of the applying user
//         const getApplyedEmail = `
//             SELECT EMAIL 
//             FROM USERS 
//             WHERE userId = $1
//         `;
//         const { rows: emailRows } = await client.query(getApplyedEmail, [takerId]);

//         if (emailRows.length === 0) {
//             await client.query('ROLLBACK');
//             return res.status(404).json({ message: 'Cannot get email', status: false });
//         }

//         const emailApply = emailRows[0].EMAIL;

//         await client.query('COMMIT');

//         // Send email notification
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: emailApply,
//             subject: 'Task Invitation',
//             text: 'Your request has been declined. Visit the app for more details.'
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log('Email error:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         return res.status(200).json({ message: 'Successfully declined', status: true });

//     } catch (error) {
//         console.log('internal server error:', error.message);
//         if (client) {
//             await client.query('ROLLBACK');
//         }
//         return res.status(500).json({ error: 'internal server error', status: false });
//     } finally {
//         client.release();
//     }
// };


export const DeclineRequest = async (req, res) => {
    try {
        const { taskId, APPLYING_USERNAME } = req.body;
        const DeclinedId = req.user.userId;

        if (!taskId || !APPLYING_USERNAME) {
            return res.status(400).json({ message: 'Missing data', status: false });
        }

        // Start the transaction
        connection.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ message: 'Transaction start error', status: false });
            }

            // Check if the task exists and the requester is the task giver
            const checkTask = `
                SELECT task_giverId, task_takerId 
                FROM TASK 
                WHERE taskId = ?
            `;
            connection.query(checkTask, [taskId], (err, taskRows) => {
                if (err) {
                    return connection.rollback(() => {
                        return res.status(412).json({ err: 'Database error', data: err.message });
                    });
                }

                if (taskRows.length === 0) {
                    return connection.rollback(() => {
                        return res.status(404).json({ message: 'No task found', status: false });
                    });
                }

                if (DeclinedId !== taskRows[0].task_giverId) {
                    return connection.rollback(() => {
                        return res.status(403).json({ message: 'You cannot decline this task', status: false });
                    });
                }

                // Get the userId of the applying user
                const getName = `
                    SELECT userId 
                    FROM USERS 
                    WHERE userName = ?
                `;
                connection.query(getName, [APPLYING_USERNAME], (err, userRows) => {
                    if (err) {
                        return connection.rollback(() => {
                            return res.status(500).json({ err: 'Error fetching user', data: err.message });
                        });
                    }

                    if (userRows.length === 0) {
                        return connection.rollback(() => {
                            return res.status(404).json({ message: 'User not found', status: false });
                        });
                    }

                    const takerId = userRows[0].userId;

                    if (takerId === taskRows[0].task_giverId) {
                        return connection.rollback(() => {
                            return res.status(400).json({ message: 'You cannot decline your own task', status: false });
                        });
                    }

                    // Update the apply task status
                    const updateApplyTask = `
                        UPDATE APPLY_TASK 
                        SET Apply_Status = ? 
                        WHERE taskId = ? AND task_giverId = ? AND applying_user = ?
                    `;
                    connection.query(updateApplyTask, ['Declined', taskId, DeclinedId, takerId], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                return res.status(500).json({ message: 'Failed to update apply task', status: false });
                            });
                        }

                        // Get the email of the applying user
                        const getApplyedEmail = `
                            SELECT EMAIL 
                            FROM USERS 
                            WHERE userId = ?
                        `;
                        connection.query(getApplyedEmail, [takerId], (err, emailRows) => {
                            if (err) {
                                return connection.rollback(() => {
                                    return res.status(500).json({ message: 'Failed to retrieve email', status: false });
                                });
                            }

                            if (emailRows.length === 0) {
                                return connection.rollback(() => {
                                    return res.status(404).json({ message: 'Email not found', status: false });
                                });
                            }

                            const emailApply = emailRows[0].EMAIL;

                            // Commit the transaction
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        return res.status(500).json({ message: 'Transaction commit failed', status: false });
                                    });
                                }

                                // Send email notification
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: process.env.EMAIL_USER,
                                        pass: process.env.EMAIL_PASS
                                    }
                                });

                                const mailOptions = {
                                    from: process.env.EMAIL_USER,
                                    to: emailApply,
                                    subject: 'Task Invitation',
                                    text: 'Your request has been declined. Visit the app for more details.'
                                };

                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.log('Email error:', error);
                                    } else {
                                        console.log('Email sent:', info.response);
                                    }
                                });

                                return res.status(200).json({ message: 'Successfully declined', status: true });
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.log('Internal server error:', error.message);
        if (connection) {
            connection.rollback();
        }
        return res.status(500).json({ error: 'Internal server error', status: false });
    } finally {
        if (connection) {
            connection.release(); // Release the connection
        }
    }
};



// export const taskTakerView = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const { taskId } = req.body;
//         const takerId = req.user.userId;

//         if (!taskId || !takerId) {
//             return res.status(400).json({ message: 'missing data', status: false });
//         }

//         const selectTakerId = `
//             SELECT * FROM USERS_TASK_VIEW 
//             WHERE "taskId" = $1 AND "task_takerId" = $2
//         `;

//         const { rows: tasks } = await client.query(selectTakerId, [taskId, takerId]);

//         if (tasks.length === 0) {
//             return res.status(404).json({ message: 'No task taken yet', status: false });
//         }

//         return res.status(200).json(tasks);
//     } catch (error) {
//         console.log('internal server error :', error.message);
//         return res.status(500).json({ error: 'internal server error', status: false });
//     } finally {
//         client.release();
//     }
// };

export const taskTakerView = async (req, res) => {
    try {
        const { taskId } = req.body;
        const takerId = req.user.userId;

        if (!taskId || !takerId) {
            return res.status(400).json({ message: 'missing data', status: false });
        }

        const selectTakerId = `
            SELECT * FROM USERS_TASK_VIEW 
            WHERE taskId = ? AND task_takerId = ?
        `;

        connection.query(selectTakerId, [taskId, takerId], (err, result) => {
            if(err){
                return connection.rollback(() => {
                    return res.status(412).json({err: 'error of db', data:err.message})
                })
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No task taken yet', status: false });
            }
    
            return res.status(200).json(result);
        });

    } catch (error) {
        console.error('internal server error:', error.message);
        return res.status(500).json({ error: 'internal server error', status: false });
    }
};


// export const postInvitation = async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const GiverId = req.user.userId;
//         const { TakerId, Taker_Name, Agreement, Description, Amount, Start_date, End_date } = req.body;

//         if (!TakerId || !Taker_Name || !Agreement || !Description || !Amount || !Start_date || !End_date) {
//             console.log('missing data');
//             return res.status(400).json({ message: 'missing data', status: false });
//         }

//         await client.query('BEGIN');

//         const getInvitingUser = 'SELECT * FROM USERS WHERE "userId" = $1';
//         const { rows: inviterRows } = await client.query(getInvitingUser, [GiverId]);

//         if (inviterRows.length === 0) {
//             await client.query('ROLLBACK');
//             console.log('user data missing');
//             return res.status(404).json({ message: 'user data missing', status: false });
//         }

//         const inviter = inviterRows[0].userName;
//         const balance = inviterRows[0].Balance;

//         if (balance < Amount) {
//             await client.query('ROLLBACK');
//             return res.status(400).json({ message: 'insufficient Amount', status: false });
//         }

//         const insertInviteData = `
//             INSERT INTO invitee (invitee, inviter, Agreement, Description, Start_date, End_date, Amount, inviterId, TakerId) 
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//         `;
//         await client.query(insertInviteData, [Taker_Name, inviter, Agreement, Description, Start_date, End_date, Amount, GiverId, TakerId]);

//         const subtractAmount = 'UPDATE USERS SET Balance = Balance - $1 WHERE "userId" = $2';
//         await client.query(subtractAmount, [Amount, GiverId]);

//         const getTakerEmail = 'SELECT EMAIL FROM USERS WHERE "userId" = $1';
//         const { rows: takerRows } = await client.query(getTakerEmail, [TakerId]);

//         if (takerRows.length === 0) {
//             await client.query('ROLLBACK');
//             return res.status(408).json('can not get Email');
//         }

//         const EmailTaker = takerRows[0].EMAIL;

//         await client.query('COMMIT');

//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         let mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: EmailTaker,
//             subject: 'Task Invitation',
//             text: 'You have been invited on Task, check on app and confirm'
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });

//         return res.status(200).json({ message: 'successfully invited', status: true });
//     } catch (error) {
//         console.log('internal server error :', error.message);
//         await client.query('ROLLBACK');
//         res.status(500).json({ error: 'internal server error' });
//     } finally {
//         client.release();
//     }
// };


export const postInvitation = async (req, res) => {
    try {
        const GiverId = req.user.userId;
        const { TakerId, Taker_Name, Agreement, Description, Amount, Start_date, End_date } = req.body;

        if (!TakerId || !Taker_Name || !Agreement || !Description || !Amount || !Start_date || !End_date) {
            console.log('missing data');
            return res.status(400).json({ message: 'Missing data', status: false });
        }

        // Start the transaction
        connection.beginTransaction(async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Transaction start error', status: false });
            }

            const getInvitingUser = 'SELECT * FROM USERS WHERE userId = ?';
            connection.query(getInvitingUser, [GiverId], (err, inviterRows) => {
                if (err) {
                    return connection.rollback(() => {
                        return res.status(500).json({ message: 'Error fetching inviter data', status: false });
                    });
                }

                if (inviterRows.length === 0) {
                    return connection.rollback(() => {
                        console.log('User data missing');
                        return res.status(404).json({ message: 'User data missing', status: false });
                    });
                }

                const inviter = inviterRows[0].userName;
                const balance = inviterRows[0].Balance;

                if (balance < Amount) {
                    return connection.rollback(() => {
                        return res.status(400).json({ message: 'Insufficient balance', status: false });
                    });
                }

                // Insert invite data
                const insertInviteData = `
                    INSERT INTO invitee (invitee, inviter, Agreement, Description, Start_date, End_date, Amount, inviterId, TakerId) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                connection.query(insertInviteData, [Taker_Name, inviter, Agreement, Description, Start_date, End_date, Amount, GiverId, TakerId], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            return res.status(500).json({ message: 'Error inserting invite data', status: false });
                        });
                    }

                    // Subtract amount from inviter's balance
                    const subtractAmount = 'UPDATE USERS SET Balance = Balance - ? WHERE userId = ?';
                    connection.query(subtractAmount, [Amount, GiverId], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                return res.status(500).json({ message: 'Error updating balance', status: false });
                            });
                        }

                        // Get taker's email
                        const getTakerEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
                        connection.query(getTakerEmail, [TakerId], (err, takerRows) => {
                            if (err) {
                                return connection.rollback(() => {
                                    return res.status(500).json({ message: 'Error fetching taker email', status: false });
                                });
                            }

                            if (takerRows.length === 0) {
                                return connection.rollback(() => {
                                    return res.status(404).json('Cannot get Email');
                                });
                            }

                            const EmailTaker = takerRows[0].EMAIL;

                            // Commit the transaction
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        return res.status(500).json({ message: 'Transaction commit failed', status: false });
                                    });
                                }

                                // Send email notification
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: process.env.EMAIL_USER,
                                        pass: process.env.EMAIL_PASS
                                    }
                                });

                                const mailOptions = {
                                    from: process.env.EMAIL_USER,
                                    to: EmailTaker,
                                    subject: 'Task Invitation',
                                    text: 'You have been invited to a task, check the app and confirm.'
                                };

                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.log('Email error:', error);
                                    } else {
                                        console.log('Email sent:', info.response);
                                    }
                                });

                                return res.status(200).json({ message: 'Successfully invited', status: true });
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.log('Internal server error:', error.message);
        if (connection) {
            connection.rollback();
        }
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            connection.release(); // Release the connection
        }
    }
};




// export const taskInviteeView = async (req, res) => {
//     const USERID = req.user.userId;
//     // console.log('userId :', USERID);

//     const selectTask = 'SELECT * FROM "INVITEE_VIEW" WHERE "TakerId" = $1 AND "Approval" = $2';

//     try {
//         const { rows, rowCount } = await pool.query(selectTask, [USERID, 'Approve']);

//         if (rowCount === 0) {
//             return res.status(404).json({ message: 'No task found', status: false });
//         }

//         return res.status(200).json(rows);
//     } catch (err) {
//         console.log('error :', err.message);
//         return res.status(409).json({ message: 'error', status: false });
//     }
// };


export const taskInviteeView = async (req, res) => {
    try {
        const USERID = req.user.userId;

        const selectTask = 'SELECT * FROM INVITEE_VIEW WHERE TakerId = ? AND Approval = ?';

    
        connection.query(selectTask, [USERID, 'Approve'], (err, response) => {
            if(err){
                return connection.rollback(() => {
                    return res.status(400).json('error of db')
                })
            }
            if (response.length === 0) {
                return res.status(404).json({ message: 'No task found', status: false });
            }
    
            return res.status(200).json(response);
        });

    } catch (err) {
        console.log('error:', err.message);
        return res.status(500).json({ message: 'error', status: false });
    }
};

export const taskInviteePending = async (req, res) => {
    const USERID = req.user.userId
    //console.log('userId :', USERID)
    const selectTask = 'SELECT * FROM INVITEE_VIEW WHERE TakerId = ? AND Approval = ? ';
    connection.query(selectTask, [USERID, 'Pending..'], (err, result) => {
        if(err){
            console.log('error :', err.message)
            return res.status(409).json({message: 'error', status: false})
        }
        if(result.lenght === 0){
            return res.status(404).json({message: 'No task found', status: false})
        }
        const data = result
        //console.log('data :', data)
        return res.status(200).json(data)
    })
}




// export const acceptInvitation = async (req, res) => {
//     try{
//         const {inviteeId, TakerId, Approval} = req.body
//         console.log('req body :', req.body)
//         const userId = req.user.userId
//         console.log('accepter :', userId)

//         if(!inviteeId || !TakerId || !Approval){
//             return res.status(404).json('missing data')
//         }

//         connection.beginTransaction(err => {
//             if(err){
//                 throw err
//             }

//             const checkAccepter = 'SELECT * FROM INVITEE WHERE inviteeId = ? AND TakerId = ? AND Approval = ?';
//             connection.query(checkAccepter, [inviteeId, TakerId, Approval], (err, result) => {
//                 if(err){
//                     return connection.rollback(() => {
//                         return res.status(400).json(err.message)
//                     })
//                 }
//                 console.log('results :', result[0].Approval)

//                 if(result[0].Approval !== 'Pending..'){
//                     return connection.rollback(() => {
//                         return res.status(409).json({message: 'not expected status', status: false})
//                     })
//                 }
//                 const updateApprovalStatue = 'UPDATE INVITEE SET Approval = ? WHERE inviteeId = ? AND TakerId = ?';
//                 connection.query(updateApprovalStatue, ["Approve", inviteeId, TakerId], (err, updateResult) => {
//                     if(err){
//                         return connection.rollback(() => {
//                             return res.status(403).json('fail to update')
//                         })
//                     }
//                     connection.commit(err => {
//                         if(err){
//                             return connection.rollback(() => {
//                                 return res.status(408).json('fail to commit')
//                             })
//                         }

//                         let transporter = nodemailer.createTransport({
//                             service: 'gmail',
//                             auth: {
//                                 user: process.env.EMAIL_USER,
//                                 pass: process.env.EMAIL_PASS
//                             }
//                         });

//                         let mailOptions = {
//                             from: process.env.EMAIL_USER,
//                             to: taskGiverEmail,
//                             subject: 'Task Request Confirmation',
//                             text: 'You have a task request you need to confirm.'
//                         };

//                         transporter.sendMail(mailOptions, (error, info) => {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log('Email sent: ' + info.response);
//                             }
//                         });
//                         return res.status(200).json({message: 'succeffull accept', status: true})
//                     })
//                 })
//             })
//         })

//     }catch(error){
//         console.log('internal server error :', error.message)
//         return res.status(500).json({error: 'internal serer error'})
//     }
// }


// export const DeclineInvitation = async (req, res) => {
//     try{
//         const {inviteeId, TakerId, Approval, inviterId} = req.body
//         console.log('req body :', req.body)
//         const userId = req.user.userId

//         if(!inviteeId || !TakerId || !Approval || !inviterId){
//             return res.status(404).json('missing data')
//         }

//         connection.beginTransaction(err => {
//             if(err){
//                 throw err
//             }

//             const checkAccepter = 'SELECT * FROM INVITEE WHERE inviteeId = ? AND TakerId = ? AND Approval = ?';
//             connection.query(checkAccepter, [inviteeId, TakerId, Approval], (err, result) => {
//                 if(err){
//                     return connection.rollback(() => {
//                         return res.status(400).json(err.message)
//                     })
//                 }
//                 console.log('results :', result[0].Approval)

//                 if(result[0].Approval !== 'Pending..'){
//                     return connection.rollback(() => {
//                         return res.status(409).json({message: 'not expected status', status: false})
//                     })
//                 }

//                 const getTakerEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
//                 connection.query(getTakerEmail, [inviterId], (err, resultEmail) => {
//                     if(err){
//                         return connection.rollback(() => {
//                             return res.status(406).json('missing Email')
//                         })
//                     }
//                     const inviterIdEmail = resultEmail[0].EMAIL
//                     console.log('inviterEmail :', inviterIdEmail)
                
//                     const updateApprovalStatue = 'UPDATE INVITEE SET Approval = ? WHERE inviteeId = ? AND TakerId = ?';
//                     connection.query(updateApprovalStatue, ["Declined", inviteeId, TakerId], (err, updateResult) => {
//                         if(err){
//                             return connection.rollback(() => {
//                                 return res.status(403).json('fail to update')
//                             })
//                         }
//                         connection.commit(err => {
//                             if(err){
//                                 return connection.rollback(() => {
//                                     return res.status(408).json('fail to commit')
//                                 })
//                             }

//                             let transporter = nodemailer.createTransport({
//                                 service: 'gmail',
//                                 auth: {
//                                     user: process.env.EMAIL_USER,
//                                     pass: process.env.EMAIL_PASS
//                                 }
//                             });
    
//                             let mailOptions = {
//                                 from: process.env.EMAIL_USER,
//                                 to: inviterIdEmail,
//                                 subject: 'Task inviation Declined',
//                                 text: 'Your Task invitation has been decined.'
//                             };
    
//                             transporter.sendMail(mailOptions, (error, info) => {
//                                 if (error) {
//                                     console.log(error);
//                                 } else {
//                                     console.log('Email sent: ' + info.response);
//                                 }
//                             });
//                             return res.status(200).json({message: 'succeffull accept', status: true})
//                         })
//                     })
//                 })
//             })
//         })

//     }catch(error){
//         console.log('internal server error :', error.message)
//         return res.status(500).json({error: 'internal serer error'})
//     }
// }


// export const taskInviteePending = async (req, res) => {
//     const USERID = req.user.userId;
//     // console.log('userId :', USERID);

//     const selectTask = 'SELECT * FROM "INVITEE_VIEW" WHERE "TakerId" = $1 AND "Approval" = $2';

//     try {
//         const { rows, rowCount } = await pool.query(selectTask, [USERID, 'Pending..']);

//         if (rowCount === 0) {
//             return res.status(404).json({ message: 'No task found', status: false });
//         }

//         return res.status(200).json(rows);
//     } catch (err) {
//         console.log('error :', err.message);
//         return res.status(409).json({ message: 'error', status: false });
//     }
// };

// export const acceptInvitation = async (req, res) => {
//     try {
//         const { inviteeId, TakerId, Approval } = req.body;
//         console.log('req body :', req.body);
//         const userId = req.user.userId;
//         console.log('accepter :', userId);

//         // Check for missing data
//         if (!inviteeId || !TakerId || !Approval) {
//             return res.status(404).json('Missing data');
//         }

//         // Grab a client from the pool
//         const client = await pool.connect();

//         try {
//             // Begin the transaction
//             await client.query('BEGIN');

//             // Check if the invitee's status is still 'Pending..'
//             const checkAccepter = 'SELECT * FROM "INVITEE" WHERE "inviteeId" = $1 AND "TakerId" = $2 AND "Approval" = $3';
//             const result = await client.query(checkAccepter, [inviteeId, TakerId, Approval]);

//             if (result.rows.length === 0 || result.rows[0].Approval !== 'Pending..') {
//                 await client.query('ROLLBACK');
//                 return res.status(409).json({ message: 'Not expected status', status: false });
//             }

//             // Update approval status
//             const updateApprovalStatus = 'UPDATE "INVITEE" SET "Approval" = $1 WHERE "inviteeId" = $2 AND "TakerId" = $3';
//             await client.query(updateApprovalStatus, ['Approved', inviteeId, TakerId]);

//             // Commit the transaction
//             await client.query('COMMIT');

//             // Send an email to the task giver
//             let transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.EMAIL_USER,
//                     pass: process.env.EMAIL_PASS
//                 }
//             });

//             let mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: 'taskGiverEmail@example.com', // Replace with the actual task giver's email
//                 subject: 'Task Request Confirmation',
//                 text: 'You have a task request you need to confirm.'
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                 }
//             });

//             return res.status(200).json({ message: 'Successfully accepted invitation', status: true });
//         } catch (err) {
//             // Rollback in case of an error
//             await client.query('ROLLBACK');
//             console.log('Transaction error:', err.message);
//             return res.status(500).json({ error: 'Internal server error' });
//         } finally {
//             // Release the client back to the pool
//             client.release();
//         }
//     } catch (error) {
//         console.log('Internal server error:', error.message);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };



export const acceptInvitation = (req, res) => {
    const { inviteeId, TakerId, Approval } = req.body;
    const userId = req.user.userId;

    if (!inviteeId || !TakerId || !Approval) {
        return res.status(404).json('Missing data');
    }

    // Directly use the global connection object
    try{
        connection.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
    
            const checkAccepter = 'SELECT * FROM INVITEE WHERE inviteeId = ? AND TakerId = ? AND Approval = ?';
            connection.query(checkAccepter, [inviteeId, TakerId, Approval], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        return res.status(500).json({ error: 'Internal server error' });
                    });
                }
    
                if (results.length === 0 || results[0].Approval !== 'Pending..') {
                    return connection.rollback(() => {
                        return res.status(409).json({ message: 'Not expected status', status: false });
                    });
                }
    
                const updateApprovalStatus = 'UPDATE INVITEE SET Approval = ? WHERE inviteeId = ? AND TakerId = ?';
                connection.query(updateApprovalStatus, ['Approved', inviteeId, TakerId], (error) => {
                    if (error) {
                        return connection.rollback(() => {
                            return res.status(500).json({ error: 'Internal server error' });
                        });
                    }
    
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                return res.status(500).json({ error: 'Internal server error' });
                            });
                        }
    
                        // Send email notification
                        const mailOptions = {
                            from: process.env.EMAIL_USER,
                            to: 'taskGiverEmail@example.com', // Replace with the actual task giver's email
                            subject: 'Task Request Confirmation',
                            text: 'You have a task request you need to confirm.'
                        };
    
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS
                            }
                        });
    
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error('Email error:', error);
                            } else {
                                console.log('Email sent:', info.response);
                            }
                        });
    
                        return res.status(200).json({ message: 'Successfully accepted invitation', status: true });
                    });
                });
            });
        });
    } catch (error) {
        console.log('Internal server error:', error.message);
        if (connection) {
            connection.rollback();
        }
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            connection.release(); // Release the connection
        }
    }
};


// export const DeclineInvitation = async (req, res) => {
//     try {
//         const { inviteeId, TakerId, Approval, inviterId } = req.body;
//         console.log('req body :', req.body);
//         const userId = req.user.userId;

//         if (!inviteeId || !TakerId || !Approval || !inviterId) {
//             return res.status(404).json('Missing data');
//         }

//         // Start transaction
//         const client = await pool.connect();

//         try {
//             await client.query('BEGIN');

//             // Check if the invitee's status is still 'Pending..'
//             const checkAccepter = 'SELECT * FROM "INVITEE" WHERE "inviteeId" = $1 AND "TakerId" = $2 AND "Approval" = $3';
//             const result = await client.query(checkAccepter, [inviteeId, TakerId, Approval]);

//             if (result.rows.length === 0 || result.rows[0].Approval !== 'Pending..') {
//                 await client.query('ROLLBACK');
//                 return res.status(409).json({ message: 'Not expected status', status: false });
//             }

//             // Get inviter's email
//             const getTakerEmail = 'SELECT "EMAIL" FROM "USERS" WHERE "userId" = $1';
//             const resultEmail = await client.query(getTakerEmail, [inviterId]);

//             if (resultEmail.rows.length === 0) {
//                 await client.query('ROLLBACK');
//                 return res.status(406).json('Missing Email');
//             }

//             const inviterIdEmail = resultEmail.rows[0].EMAIL;
//             console.log('Inviter Email:', inviterIdEmail);

//             // Update approval status
//             const updateApprovalStatus = 'UPDATE "INVITEE" SET "Approval" = $1 WHERE "inviteeId" = $2 AND "TakerId" = $3';
//             await client.query(updateApprovalStatus, ['Declined', inviteeId, TakerId]);

//             await client.query('COMMIT');

//             // Send an email notification
//             let transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.EMAIL_USER,
//                     pass: process.env.EMAIL_PASS
//                 }
//             });

//             let mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: inviterIdEmail,
//                 subject: 'Task Invitation Declined',
//                 text: 'Your Task invitation has been declined.'
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                 }
//             });

//             return res.status(200).json({ message: 'Successfully declined invitation', status: true });
//         } catch (err) {
//             await client.query('ROLLBACK');
//             console.log('Transaction error:', err.message);
//             return res.status(500).json({ error: 'Internal server error' });
//         } finally {
//             client.release(); // Release the client back to the pool
//         }
//     } catch (error) {
//         console.log('Internal server error:', error.message);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


export const DeclineInvitation = (req, res) => {
    const connection = getConnection(); // Replace with your actual connection method
    const { inviteeId, TakerId, Approval, inviterId } = req.body;
    const userId = req.user.userId;

    if (!inviteeId || !TakerId || !Approval || !inviterId) {
        return res.status(404).json('Missing data');
    }

    try{
        connection.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
    
            const checkAccepter = 'SELECT * FROM INVITEE WHERE inviteeId = ? AND TakerId = ? AND Approval = ?';
            connection.query(checkAccepter, [inviteeId, TakerId, Approval], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        return res.status(500).json({ error: 'Internal server error' });
                    });
                }
    
                if (results.length === 0 || results[0].Approval !== 'Pending..') {
                    return connection.rollback(() => {
                        return res.status(409).json({ message: 'Not expected status', status: false });
                    });
                }
    
                const getTakerEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
                connection.query(getTakerEmail, [inviterId], (error, emailResults) => {
                    if (error) {
                        return connection.rollback(() => {
                            return res.status(500).json({ error: 'Internal server error' });
                        });
                    }
    
                    if (emailResults.length === 0) {
                        return connection.rollback(() => {
                            return res.status(406).json('Missing Email');
                        });
                    }
    
                    const inviterEmail = emailResults[0].EMAIL;
    
                    const updateApprovalStatus = 'UPDATE INVITEE SET Approval = ? WHERE inviteeId = ? AND TakerId = ?';
                    connection.query(updateApprovalStatus, ['Declined', inviteeId, TakerId], (error) => {
                        if (error) {
                            return connection.rollback(() => {
                                return res.status(500).json({ error: 'Internal server error' });
                            });
                        }
    
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    return res.status(500).json({ error: 'Internal server error' });
                                });
                            }
    
                            const mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: inviterEmail,
                                subject: 'Task Invitation Declined',
                                text: 'Your task invitation has been declined.'
                            };
    
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL_USER,
                                    pass: process.env.EMAIL_PASS
                                }
                            });
    
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    console.log('Email sent:', info.response);
                                }
                            });
    
                            return res.status(200).json({ message: 'Successfully declined invitation', status: true });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.log('Internal server error:', error.message);
        if (connection) {
            connection.rollback();
        }
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            connection.release(); 
        }
    }
};


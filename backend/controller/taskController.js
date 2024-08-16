import nodemailer from 'nodemailer';
import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();

export const assignTask = async (req, res) => {
    try{
        const {Agreement, Start_date, End_date, Duration, Amount, Description} = req.body;
        console.log('req.body :', req.body)
        const task_giverId = req.user.userId
        console.log('Duration :', Duration)
        const formattedDuration = `${Duration} Day${Duration > 1 ? 's' : ''}`;
        if(!Agreement || !Start_date || !End_date || !Amount || !task_giverId || !Description){
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
                const insertTask = 'INSERT INTO TASK (Agreement, Start_date, End_date, Amount, Duration, task_giverId, Description) VALUES (?, ?, ?, ?, ?, ?, ?)';
                connection.query(insertTask, [Agreement, Start_date, End_date, Amount, formattedDuration, task_giverId, Description], async(err, result) => {
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
        const findAssigneer = 'SELECT * FROM TASK WHERE task_giverId = ?';
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
            const checkTask = 'SELECT task_giverId, task_takerId FROM TASK WHERE taskId = ?';
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
            
            const insertTaskTaker = 'INSERT INTO TASK_TAKER (taskId, takerId) VALUES (?, ?)';
            connection.query(insertTaskTaker, [taskId, taker_Id], (err, insertResult) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log('Error inserting task taker:', err);
                        return res.status(403).json({ err: 'Error taking task' });
                    });
                }

                const updateTask = 'UPDATE TASK SET task_takerId = ?, Task_status= ?, task_taker_name= ? WHERE taskId = ?';
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

                    
                
                            const updateApplyTask = 'UPDATE APPLY_TASK SET Apply_Status = ? WHERE taskId = ? AND task_giverId = ? AND applying_user = ?';
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




export const DeclineRequest = async (req, res) => {
    const { taskId, APPLYING_USERNAME } = req.body;
    const DeclinedId = req.user.userId;
  
    if (!taskId || !APPLYING_USERNAME) {
      return res.status(404).json('Missing data');
    }
  
    connection.beginTransaction(err => {
      if (err) {
        return res.status(500).json({ error: 'Transaction start error' });
      }
  
      const checkTask = 'SELECT task_giverId, task_takerId FROM TASK WHERE taskId = ?';
      connection.query(checkTask, [taskId], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            return res.status(400).json({ error: 'Error checking task' });
          });
        }
  
        if (result.length === 0) {
          return connection.rollback(() => {
            return res.status(404).json('No task found');
          });
        }
  
        if (DeclinedId !== result[0].task_giverId) {
          return connection.rollback(() => {
            return res.status(401).json('You cannot decline ');
          });
        }
  
        const getName = 'SELECT userId FROM USERS WHERE userName = ?';
        connection.query(getName, [APPLYING_USERNAME], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              return res.status(400).json('Some issue occurred');
            });
          }
  
          if (results.length === 0) {
            return connection.rollback(() => {
              return res.status(404).json('User not found');
            });
          }
  
          const taker_Id = results[0].userId;
          if (taker_Id === result[0].task_giverId) {
            return connection.rollback(() => {
              return res.status(400).json('You cannot Decline your own task');
            });
          }
  
          const updateApplyTask = 'UPDATE APPLY_TASK SET Apply_Status = ? WHERE taskId = ? AND task_giverId = ? AND applying_user = ?';
          connection.query(updateApplyTask, ['Declined', taskId, DeclinedId, taker_Id], (err, result) => {
            if (err) {
              return connection.rollback(() => {
                return res.status(400).json('Failed to update apply task');
              });
            }

            const getApplyedEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
            connection.query(getApplyedEmail, [taker_Id], (err, AppliedEmail) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(406).json('can not get Email')
                    })
                }

                const EmailApply = AppliedEmail[0].EMAIL
                console.log('EmailApply :', EmailApply)
            
  
                connection.commit(commitErr => {
                if (commitErr) {
                    return connection.rollback(() => {
                    return res.status(500).json('Transaction commit error');
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
                    to: EmailApply,
                    subject: 'Task Invitation',
                    text: 'Your request has been declined visite the app for more details'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({ message: 'Successfully declined', status: true });
                });
            })
          });
        });
      });
    });
  };
  

export const taskTakerView = async(req, res) => {
    try{
        const {taskId} = req.body
        const takerId = req.user.userId;
        if(!taskId || !takerId){
            return res.status(401).json('missing data')
        }
        const selectTakerId = 'SELECT * FROM USERS_TASK_VIEW WHERE taskId = ? && task_takerId = ?';
        connection.query(selectTakerId, [taskId, takerId], (err, result) => {
            if(err){
                console.log('error :', err.message)
                return res.status(400).json({err: 'error'})
            }
            if(result.lenght === 0){
                return res.status(201).json({message: 'No task taken yet'})
            }
            const tasks = result;
            return res.status(200).json(tasks)
        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal serer error'})
    }
}




export const postInvitation = async (req, res) => {
    const GiverId = req.user.userId

    const {TakerId, Taker_Name, Agreement, Description, Amount, Start_date, End_date} = req.body

    if(!TakerId || !Taker_Name || !Agreement || !Description || !Amount || !Start_date || !End_date){
        console.log('missing data')
        return res.status(400).json({message: 'missing data', status: false})
    }

    connection.beginTransaction(err => {
        if(err){
            throw new Error (err)
        }

        const getInvittingUser = 'SELECT * FROM USERS WHERE userId = ?'
        connection.query(getInvittingUser, [GiverId], (err, result) => {
            if(err){
                return connection.rollback(() => {
                    console.log('error :', err.message)
                    return res.status(404).json({message: 'user data missing', status: false})
                })
            }
            console.log('result :', result)
            const inviter = result[0].userName
            console.log('userData :', inviter)
            console.log( 'bal :', result[0].Balance)
            console.log('check bal :', result[0].Balance < Amount)
            if(result[0].Balance < Amount){
                return connection.rollback(() => {
                    return res.status(400).json({message: 'insufficient Amount', status: false})
                })
            }

            const insertInviteData = 'INSERT INTO invitee (invitee, inviter, Agreement, Description, Start_date, End_date, Amount, inviterId, TakerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertInviteData, [Taker_Name, inviter, Agreement, Description, Start_date, End_date, Amount, GiverId, TakerId], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        console.log('error :', err.message)
                        return res.status(409).json({err: 'error'})
                    })
                }
                const substractAmount = 'UPDATE USERS SET Balance = Balance - ? WHERE userId = ?';
                connection.query(substractAmount, [Amount, GiverId], (err, subResult) => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(303).json(err.message)
                        })
                    }
                    const getTakerName = 'SELECT EMAIL FROM USERS WHERE userId = ?';
                    connection.query(getTakerName, [TakerId], (err, TakerEma) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(408).json('can not get Email')
                            })
                        }
                        const EmailTaker = TakerEma[0].EMAIL
                        console.log('emailTaker :', EmailTaker)
                    
                    
                        connection.commit(err => {
                            if(err){
                                return connection.rollback(() => {
                                    console.log('fail to commit :', err.message)
                                    return res.status(409).json({message: 'fail to commit :', status: false})
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
                                to: EmailTaker,
                                subject: 'Task Invitation',
                                text: 'You have been invited on Task, check on app and confirm'
                            };
    
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });

                            return res.status(200).json({message: 'successfully invited', status: true})
                        })
                    })
                })
            })
        })
    })
}


export const taskInviteeView = async (req, res) => {
    const USERID = req.user.userId
    //console.log('userId :', USERID)
    const selectTask = 'SELECT * FROM INVITEE_VIEW WHERE TakerId = ? AND Approval = ?';
    connection.query(selectTask, [USERID, "Approve"], (err, result) => {
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




export const acceptInvitation = async (req, res) => {
    try{
        const {inviteeId, TakerId, Approval} = req.body
        console.log('req body :', req.body)
        const userId = req.user.userId
        console.log('accepter :', userId)

        if(!inviteeId || !TakerId || !Approval){
            return res.status(404).json('missing data')
        }

        connection.beginTransaction(err => {
            if(err){
                throw err
            }

            const checkAccepter = 'SELECT * FROM INVITEE WHERE inviteeId = ? AND TakerId = ? AND Approval = ?';
            connection.query(checkAccepter, [inviteeId, TakerId, Approval], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(400).json(err.message)
                    })
                }
                console.log('results :', result[0].Approval)

                if(result[0].Approval !== 'Pending..'){
                    return connection.rollback(() => {
                        return res.status(409).json({message: 'not expected status', status: false})
                    })
                }
                const updateApprovalStatue = 'UPDATE INVITEE SET Approval = ? WHERE inviteeId = ? AND TakerId = ?';
                connection.query(updateApprovalStatue, ["Approve", inviteeId, TakerId], (err, updateResult) => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(403).json('fail to update')
                        })
                    }
                    connection.commit(err => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(408).json('fail to commit')
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
                            to: taskGiverEmail,
                            subject: 'Task Request Confirmation',
                            text: 'You have a task request you need to confirm.'
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });

                        return res.status(200).json({message: 'succeffull accept', status: true})
                    })
                })
            })
        })

    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal serer error'})
    }
}


export const DeclineInvitation = async (req, res) => {
    try{
        const {inviteeId, TakerId, Approval, inviterId} = req.body
        console.log('req body :', req.body)
        const userId = req.user.userId

        if(!inviteeId || !TakerId || !Approval || !inviterId){
            return res.status(404).json('missing data')
        }

        connection.beginTransaction(err => {
            if(err){
                throw err
            }

            const checkAccepter = 'SELECT * FROM INVITEE WHERE inviteeId = ? AND TakerId = ? AND Approval = ?';
            connection.query(checkAccepter, [inviteeId, TakerId, Approval], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(400).json(err.message)
                    })
                }
                console.log('results :', result[0].Approval)

                if(result[0].Approval !== 'Pending..'){
                    return connection.rollback(() => {
                        return res.status(409).json({message: 'not expected status', status: false})
                    })
                }

                const getTakerEmail = 'SELECT EMAIL FROM USERS WHERE userId = ?';
                connection.query(getTakerEmail, [inviterId], (err, resultEmail) => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(406).json('missing Email')
                        })
                    }
                    const inviterIdEmail = resultEmail[0].EMAIL
                    console.log('inviterEmail :', inviterIdEmail)
                
                    const updateApprovalStatue = 'UPDATE INVITEE SET Approval = ? WHERE inviteeId = ? AND TakerId = ?';
                    connection.query(updateApprovalStatue, ["Declined", inviteeId, TakerId], (err, updateResult) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(403).json('fail to update')
                            })
                        }
                        connection.commit(err => {
                            if(err){
                                return connection.rollback(() => {
                                    return res.status(408).json('fail to commit')
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
                                to: inviterIdEmail,
                                subject: 'Task inviation Declined',
                                text: 'Your Task invitation has been decined.'
                            };
    
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });

                            return res.status(200).json({message: 'succeffull accept', status: true})
                        })
                    })
                })
            })
        })

    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal serer error'})
    }
}




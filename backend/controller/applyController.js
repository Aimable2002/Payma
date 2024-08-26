import connectDatabase from "../database/connectDatabase.js";
import nodemailer from 'nodemailer';


const connection = connectDatabase();



export const applyTask = async (req, res) => {
    try{
        const taskId = req.params.id
        console.log('taskId :', taskId)
        const applyingId = req.user.userId;
        console.log('pennding :', applyingId)
        if(!taskId) {
            console.log({message:'data missing'})
        }
        connection.beginTransaction(err => {
            if(err){
                throw err
            }
            const selectTaskGiver = 'SELECT * FROM TASK WHERE taskId = ?';
            connection.query(selectTaskGiver, [taskId], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(404).json({message: 'error query'})
                    })
                }
                const taskGiver = result[0].task_giverId
                console.log('data :', taskGiver)
                if(taskGiver === applyingId){
                    return connection.rollback(() => {
                        return res.status(401).json('u cant apply your own task')
                    })
                }

                const getGiverEmail = 'SELECT Email FROM USERS WHERE userId = ?';
                connection.query(getGiverEmail, [taskGiver], (err, giverEmail) => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(403).json('error')
                        })
                    }
                    console.log('giverEmail :', giverEmail)
                    const taskGiverEmail = giverEmail[0].Email
                    console.log('taskGiverEmail :', taskGiverEmail)
                

                const selectApplyTask = 'SELECT * FROM APPLY_TASK WHERE taskId = ?';
                connection.query(selectApplyTask, [taskId], (err, results) => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(403).json('fail to select in apply task')
                        })
                    }
                    // if(results.length > 0 && result[0].applying_user === applyingId){
                    //     return connection.rollback(() => {
                    //         return res.status(408).json('You have already applied')
                    //     })
                    // }
                    
                    if(results.length > 0 && results[0].Apply_Status !== 'PENDING'){
                        console.log('results :', results[0].Apply_Status)
                        console.log('apply :', results[0].Apply_Status)
                        return connection.rollback(() => {
                            return res.status(409).json('task not available')
                        })
                    }

                    if (results[0].Apply_Status !== 'PENDING' && results[0].Apply_Status !== 'Declined') {
                        return connection.rollback(() => {
                            return res.status(410).json('can\'t continue');
                        });
                    }
                
                    if (results[0].applying_user === applyingId && results[0].Apply_Status !== 'Declined') {
                        return connection.rollback(() => {
                            return res.status(411).json('can\'t continue');
                        });
                    }

                    console.log('Email User:', process.env.EMAIL_USER);
                console.log('Email Pass:', process.env.EMAIL_PASS);

                const insertApply = 'INSERT INTO APPLY_TASK (taskId, applying_user, task_giverId, Status) VALUES(?,?, ?, ?)';
                connection.query(insertApply, [taskId, applyingId, taskGiver, "Applied"], (err, result) => {
                    if(err){
                        console.log(err.message)
                        return res.status(400).json({err: 'error'})
                    }
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                throw err;
                            });
                        }

                        // Send email notification
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

                        return res.status(202).json({message: 'succeffully inserted apply', status: true})
                    });
                })
            })
            })
        })
            
        })
    }catch(error){
        console.log('server error :', error.message)
        return res.status(500).json({error: 'server error'})
    }
}


export const applyTask_view = async (req, res) => {
    try{
        const user = req.user.userId
        console.log('user :', user)

        connection.beginTransaction(err => {
            if(err){
                throw err
            }
            const getApplyGranter = 'SELECT * FROM APPLYING_VIEW WHERE task_giverId = ? AND Apply_Status = ?';
            connection.query(getApplyGranter, [user, "PENDING"], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(400).json({message: 'fail', status: false})
                    })
                }
                return res.status(200).json(result)
            })
        })
    }catch(error){
        console.log('server error :', error.message)
        return res.status(500).json({error: 'server error'})
    }
}






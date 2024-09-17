import connectDatabase from "../database/connectDatabase.js";
import nodemailer from 'nodemailer';


// const connection = connectDatabase();



// export const applyTask = async (req, res) => {
//     try{
//         const taskId = req.params.id
//         console.log('taskId :', taskId)
//         const applyingId = req.user.userId;
//         console.log('pennding :', applyingId)
//         if(!taskId) {
//             console.log({message:'data missing'})
//         }
//         connection.beginTransaction(err => {
//             if(err){
//                 throw err
//             }
//             const selectTaskGiver = 'SELECT * FROM TASK WHERE taskId = ?';
//             connection.query(selectTaskGiver, [taskId], (err, result) => {
//                 if(err){
//                     return connection.rollback(() => {
//                         return res.status(404).json({message: 'error query'})
//                     })
//                 }
//                 const taskGiver = result[0].task_giverId
//                 console.log('data :', taskGiver)
//                 if(taskGiver === applyingId){
//                     return connection.rollback(() => {
//                         return res.status(401).json('u cant apply your own task')
//                     })
//                 }

//                 const getGiverEmail = 'SELECT Email FROM USERS WHERE userId = ?';
//                 connection.query(getGiverEmail, [taskGiver], (err, giverEmail) => {
//                     if(err){
//                         return connection.rollback(() => {
//                             return res.status(403).json('error')
//                         })
//                     }
//                     console.log('giverEmail :', giverEmail)
//                     const taskGiverEmail = giverEmail[0].Email
//                     console.log('taskGiverEmail :', taskGiverEmail)
                

//                 const selectApplyTask = 'SELECT * FROM APPLY_TASK WHERE taskId = ?';
//                 connection.query(selectApplyTask, [taskId], (err, results) => {
//                     if(err){
//                         return connection.rollback(() => {
//                             return res.status(403).json('fail to select in apply task')
//                         })
//                     }
//                     // if(results.length > 0 && result[0].applying_user === applyingId){
//                     //     return connection.rollback(() => {
//                     //         return res.status(408).json('You have already applied')
//                     //     })
//                     // }
                    
//                     if(results.length > 0 && results[0].Apply_Status !== 'PENDING'){
//                         console.log('results :', results[0].Apply_Status)
//                         console.log('apply :', results[0].Apply_Status)
//                         return connection.rollback(() => {
//                             return res.status(409).json('task not available')
//                         })
//                     }

//                     if (results[0].Apply_Status !== 'PENDING' && results[0].Apply_Status !== 'Declined') {
//                         return connection.rollback(() => {
//                             return res.status(410).json('can\'t continue');
//                         });
//                     }
                
//                     if (results[0].applying_user === applyingId && results[0].Apply_Status !== 'Declined') {
//                         return connection.rollback(() => {
//                             return res.status(411).json('can\'t continue');
//                         });
//                     }

//                     console.log('Email User:', process.env.EMAIL_USER);
//                 console.log('Email Pass:', process.env.EMAIL_PASS);

//                 const insertApply = 'INSERT INTO APPLY_TASK (taskId, applying_user, task_giverId, Status) VALUES(?,?, ?, ?)';
//                 connection.query(insertApply, [taskId, applyingId, taskGiver, "Applied"], (err, result) => {
//                     if(err){
//                         console.log(err.message)
//                         return res.status(400).json({err: 'error'})
//                     }
//                     connection.commit(err => {
//                         if (err) {
//                             return connection.rollback(() => {
//                                 throw err;
//                             });
//                         }

//                         // Send email notification
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

//                         return res.status(202).json({message: 'succeffully inserted apply', status: true})
//                     });
//                 })
//             })
//             })
//         })
            
//         })
//     }catch(error){
//         console.log('server error :', error.message)
//         return res.status(500).json({error: 'server error'})
//     }
// }


const pool = connectDatabase();

export const applyTask = async (req, res) => {
    const client = await pool.connect();
    try {
        const taskId = req.params.id;
        console.log('taskId :', taskId);
        const applyingId = req.user.userId;
        console.log('pending :', applyingId);

        if (!taskId) {
            return res.status(400).json({ message: 'data missing' });
        }

        await client.query('BEGIN'); // Start transaction

        // Check if the task exists and get the task giver
        const { rows: taskRows } = await client.query('SELECT * FROM TASK WHERE taskId = $1', [taskId]);
        if (taskRows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: 'Task not found' });
        }

        const taskGiver = taskRows[0].task_giverId;
        console.log('taskGiver :', taskGiver);

        if (taskGiver === applyingId) {
            await client.query('ROLLBACK');
            return res.status(401).json('You can\'t apply to your own task');
        }

        // Get the task giver's email
        const { rows: emailRows } = await client.query('SELECT Email FROM USERS WHERE userId = $1', [taskGiver]);
        if (emailRows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json('Task giver not found');
        }

        const taskGiverEmail = emailRows[0].Email;
        console.log('taskGiverEmail :', taskGiverEmail);

        // Check if the task is already applied
        const { rows: applyRows } = await client.query('SELECT * FROM APPLY_TASK WHERE taskId = $1', [taskId]);
        if (applyRows.length > 0) {
            const applyStatus = applyRows[0].Apply_Status;

            if (applyStatus !== 'PENDING' && applyStatus !== 'Declined') {
                await client.query('ROLLBACK');
                return res.status(409).json('Task not available');
            }

            if (applyRows[0].applying_user === applyingId && applyStatus !== 'Declined') {
                await client.query('ROLLBACK');
                return res.status(411).json('Cannot continue');
            }
        }

        // Insert the application
        await client.query('INSERT INTO APPLY_TASK (taskId, applying_user, task_giverId, Status) VALUES($1, $2, $3, $4)', [taskId, applyingId, taskGiver, "Applied"]);
        await client.query('COMMIT'); // Commit transaction

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

        return res.status(202).json({ message: 'Successfully applied for the task', status: true });

    } catch (error) {
        console.error('Server error:', error.message);
        await client.query('ROLLBACK'); // Ensure rollback in case of error
        return res.status(500).json({ error: 'Server error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
};



// export const applyTask_view = async (req, res) => {
//     try{
//         const user = req.user.userId
//         console.log('user :', user)

//         connection.beginTransaction(err => {
//             if(err){
//                 throw err
//             }
//             const getApplyGranter = 'SELECT * FROM APPLYING_VIEW WHERE task_giverId = ? AND Apply_Status = ?';
//             connection.query(getApplyGranter, [user, "PENDING"], (err, result) => {
//                 if(err){
//                     return connection.rollback(() => {
//                         return res.status(400).json({message: 'fail', status: false})
//                     })
//                 }
//                 return res.status(200).json(result)
//             })
//         })
//     }catch(error){
//         console.log('server error :', error.message)
//         return res.status(500).json({error: 'server error'})
//     }
// }


export const applyTask_view = async (req, res) => {
    try {
        const user = req.user.userId;
        console.log('user :', user);

        // Query to get applying tasks
        const getApplyGranter = 'SELECT * FROM APPLYING_VIEW WHERE task_giverId = $1 AND Apply_Status = $2';
        const { rows: result } = await pool.query(getApplyGranter, [user, "PENDING"]);

        return res.status(200).json(result);
    } catch (error) {
        console.log('server error :', error.message);
        return res.status(500).json({ error: 'server error' });
    }
};





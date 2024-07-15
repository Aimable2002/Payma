
import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();

export const assignTask = async (req, res) => {
    try{
        const {Agreement, Start_date, End_date, Duration, Amount} = req.body;
        const task_giverId = req.user.userId
        console.log('Duration :', Duration)
        const formattedDuration = `${Duration} Day${Duration > 1 ? 's' : ''}`;
        if(!Agreement || !Start_date || !End_date || !Amount || !task_giverId){
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
                const insertTask = 'INSERT INTO TASK (Agreement, Start_date, End_date, Amount, Duration, task_giverId) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(insertTask, [Agreement, Start_date, End_date, Amount, formattedDuration, task_giverId], async(err, result) => {
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
        const findAssigneer = 'SELECT * FROM USERS_TASK_VIEW WHERE task_takerId = ?';
        connection.query(findAssigneer, [USERID], (err, result) => {
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
        const taskId = req.params.id;
        console.log('taskId :', taskId)
        const takerId = req.user.userId
        console.log('takerId :', takerId)
        if (!taskId || !takerId) {
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
            if(takerId === result[0].task_giverId){
                return res.status(401).json('u cant take yr own task')
            }
            const getName = 'SELECT userName FROM USERS WHERE userId = ?';
            connection.query(getName, [takerId], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        return res.status(400).json('some issue occur')
                    })
                }
                const taker_name = result[0].userName
                console.log('taker_name :', taker_name)
            
            const insertTaskTaker = 'INSERT INTO TASK_TAKER (taskId, takerId) VALUES (?, ?)';
            connection.query(insertTaskTaker, [taskId, takerId], (err, insertResult) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log('Error inserting task taker:', err);
                        return res.status(403).json({ err: 'Error taking task' });
                    });
                }

                const updateTask = 'UPDATE TASK SET task_takerId = ?, Task_status= ?, task_taker_name= ? WHERE taskId = ?';
                connection.query(updateTask, [takerId, 'Taken', taker_name, taskId], (err, updateResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log('Error updating task:', err);
                            return res.status(400).json({ err: 'Error updating task' , status: false});
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                throw err;
                            });
                        }

                        return res.status(200).json({message: 'tast taken', status: true});
                    });
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
            const inviter = result[0].userName
            console.log('userData :', inviter)

            const insertInviteData = 'INSERT INTO invitee (invitee, inviter, Agreement, Description, Start_date, End_date, Amount, inviterId, TakerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertInviteData, [Taker_Name, inviter, Agreement, Description, Start_date, End_date, Amount, GiverId, TakerId], (err, result) => {
                if(err){
                    return connection.rollback(() => {
                        console.log('error :', err.message)
                        return res.status(409).json({err: 'error'})
                    })
                }
                connection.commit(err => {
                    if(err){
                        return connection.rollback(() => {
                            console.log('fail to commit :', err.message)
                            return res.status(409).json({message: 'fail to commit :', status: false})
                        })
                    }
                    return res.status(200).json({message: 'successfully invited', status: true})
                })
            })
        })
    })
}


export const taskInviteeView = async (req, res) => {
    const USERID = req.user.userId
    console.log('userId :', USERID)
    const selectTask = 'SELECT * FROM INVITEE WHERE TakerId = ?';
    connection.query(selectTask, [USERID], (err, result) => {
        if(err){
            console.log('error :', err.message)
            return res.status(409).json({message: 'error', status: false})
        }
        if(result.lenght === 0){
            return res.status(404).json({message: 'No task found', status: false})
        }
        const data = result
        console.log('data :', data)
        return res.status(200).json(data)
    })
}
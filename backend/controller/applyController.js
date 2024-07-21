import connectDatabase from "../database/connectDatabase.js";


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

                const selectApplyTask = 'SELECT * FROM APPLY_TASK WHERE taskId = ?';
                connection.query(selectApplyTask, [taskId], (err, results) => {
                    if(err){
                        return connection.rollback(() => {
                            return res.status(403).json('fail to select in apply task')
                        })
                    }
                    //console.log('results :', results)
                    console.log('apply :', results.Apply_Status)
                    if(results.Apply_Status !== 'PENDING'){
                        return connection.rollback(() => {
                            return res.status(409).json('task not available')
                        })
                    }

                const insertApply = 'INSERT INTO APPLY_TASK (taskId, applying_user, task_giverId) VALUES(?,?, ?)';
                connection.query(insertApply, [taskId, applyingId, taskGiver], (err, result) => {
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

                        return res.status(202).json({message: 'succeffully inserted apply', status: true})
                    });
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






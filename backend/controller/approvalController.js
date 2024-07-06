import connectDatabase from "../database/connectDatabase.js";


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
                console.log('reported task to u')
                return res.status(200).json(result);
            } else {
                console.log(' no reported task to u')
                return res.status(404).json('No reported tasks found');
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

                const tracktaskId = 'SELECT * FROM TASK WHERE taskId = ? AND Status = ? AND task_giverId = ?';
                console.log('tracktaskId :', tracktaskId)
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

                    const updateApproval = 'UPDATE TASK SET Approval = ? WHERE taskId = ? AND Status = ? AND task_giverId = ?';
                    connection.query(updateApproval, ['Approved', taskId, 'Reported', USERID], (err, result) => {
                        if(err){
                            return connection.rollback(() => {
                                return res.status(400).json('something went wrong')
                            })
                        }
                        connection.commit(err => {
                            if (err) {
                                return connection.rollback(() => {
                                    throw err;
                                });
                            }
    
                            res.status(200).json({message: 'tast Approved', status: true});
                        });

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



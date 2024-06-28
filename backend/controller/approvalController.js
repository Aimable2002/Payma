import connectDatabase from "../database/connectDatabase.js";


const connection = connectDatabase();


export const StatusApproval = async (req, res) => {
    try{
        const {ReportId, Status, pending_id} = req.body;

        if(!ReportId || !Status || !pending_id){
            console.log('missing data');
            return res.Status(400).json('missing data')
        }
        const insertApproval = 'INSERT INTO APPROVAL (ReportId, Status, pending_id) VALUES (?, ?, ?)';

        connection.query(insertApproval, [ReportId, Status, pending_id], (err, result) => {
            if(err){
                console.log('error inserting approval data :', err)
                return res.Status(400).json({err: 'error inserting approval data'})
            }

            return res.status(200).json('approval data inserted')
        })
    }catch(error){
        console.log('internal server approval error :', error.message)
        res.Status(500).json({error: 'internal server approval error'})
    }
}




export const approval = async (req, res) => {
    try{
        const {reportId, Status, Payment, taskId, task_takerId, USERID} = req.body;

        if(!reportId || !USERID){
            return res.status(400).json('missing data')
        }
        console.log('report id:', reportId)
        
        if(Status === 'Abort'){
            return res.status(201).json('the report is not approved')
        }
        
        else if(Status === 'Procced'){
            connection.beginTransaction(err => {
                if(err){
                    console.error('Transaction error:', err);
                    return res.status(500).json({ error: 'Transaction error' });
                }

                const tracktaskId = 'SELECT * FROM TASK WHERE taskId = ?';
                connection.query(tracktaskId, [taskId], async(err, result) => {
                    if(err){

                        return connection.rollback(() => {
                            console.log('error tracking report :', err)
                            return res.status(400).json({err: 'error tracking report'})
                        })
                    }
                    if (result.length === 0) {
                        return connection.rollback(() => {
                            res.status(404).json({ error: 'Task not found' });
                        });
                    }

                    const taskId = result[0];
                    console.log('taskId :', taskId)
                    if(taskId.task_giverId === USERID){
                        console.log('user data match')
                        res.status(201).json('user data match')
                    }else{
                        res.status(400).json('user data not match')
                    }


                })
            })
        }else{
            res.status(400).json({error: 'something went wrong'})
        }
    }catch(error){
        console.log('internal server approval error :', error.message)
        res.status(500).json({error: 'internal server approval error'})
    }
}



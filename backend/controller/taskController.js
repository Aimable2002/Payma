
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
        console.log('dashboard user :', USERID)
        const findAssigneer = 'SELECT * FROM USERS_TASK_VIEW WHERE task_takerId = ?';
        connection.query(findAssigneer, [USERID], (err, result) => {
            if(err){
                throw err
            }
            if(result.lenght === 0){
                return res.status(404).json('Not yet assigned task')
            }
            console.log('results :', result)
            return res.status(200).json(result)

        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

export const taskTaker = async (req, res) => {
    try {
        const { taskId, takerId } = req.body;

        if (!taskId || !takerId) {
            return res.status(404).json('Missing data');
        }

        connection.beginTransaction(err => {
            if (err) {
                throw err;
            }

            const insertTaskTaker = 'INSERT INTO TASK_TAKER (taskId, takerId) VALUES (?, ?)';
            connection.query(insertTaskTaker, [taskId, takerId], (err, insertResult) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log('Error inserting task taker:', err);
                        res.status(400).json({ err: 'Error taking task' });
                    });
                }

                const updateTask = 'UPDATE TASK SET task_takerId = ? WHERE taskId = ?';
                connection.query(updateTask, [takerId, taskId], (err, updateResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log('Error updating task:', err);
                            res.status(400).json({ err: 'Error updating task' });
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                throw err;
                            });
                        }

                        res.status(200).json('Task taken successfully');
                    });
                });
            });
        });
    } catch (error) {
        console.log('Internal task taker server error:', error.message);
        res.status(500).json({ error: 'Internal task taker server error' });
    }
};

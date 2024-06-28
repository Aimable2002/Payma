
import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();

export const assignTask = async (req, res) => {
    try{
        const {Agreement, Start_date, End_date, Duration, Amount, task_giverId} = req.body;

        if(!Agreement || !Start_date || !End_date || !Amount || !task_giverId){
            return res.status(409).json('insert data')
        }
        const insertTask = 'INSERT INTO TASK (Agreement, Start_date, End_date, Amount, Duration, task_giverId) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(insertTask, [Agreement, Start_date, End_date, Amount, Duration, task_giverId], async(err, result) => {
            if(err){
                console.log('error inserting task :', err)
                return res.status(400).json({err: 'error inserting task'})
            }
            return res.status(200).json('task inserted')
        })
    }catch(error){
        console.log('internal task server error :', error.message);
        res.status(500).json({error: 'internal server task error'})
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

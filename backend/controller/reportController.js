import connectDatabase from "../database/connectDatabase.js";


const connection = connectDatabase();


export const Report = async (req, res) => {
    try{
        const {Agreement, taskId} = req.body
        console.log('req :', req.body)
        // const End_date =  Date.now()
        const End_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log('End date :', End_date)
        const task_taker_id = req.user.userId
        console.log('id :', task_taker_id)
        if(!Agreement ||  !End_date || !taskId || !task_taker_id){
            console.log('missing data')
            return res.status(404).json('missing data')
        }

        const insertReport = 'INSERT INTO REPORT (Proof, End_date, taskId, task_taker_id) VALUES (?, ?, ?, ?)';
        connection.query(insertReport, [Agreement, End_date, taskId, task_taker_id], (err, result) => {
            if(err){
                console.log('error inserting report :', err)
                return res.status(400).json({err: 'error inserting report', status: false})
            }
            return res.status(200).json({message: 'report inserted', status: true})
        })
    }catch(error){
        console.log('internal report server error :', error.message);
        res.status(500).json({error: 'internal server report error'})
    }
}
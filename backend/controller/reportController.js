import connectDatabase from "../database/connectDatabase.js";


const connection = connectDatabase();


export const Report = async (req, res) => {
    try{
        const {Proof, End_date, taskId, task_taker_id} = req.body;

        if(!Proof ||  !End_date || !taskId || !task_taker_id){
            console.log('missing data')
            return res.status(404).json('missing data')
        }

        const insertReport = 'INSERT INTO REPORT (Proof, End_date, taskId, task_taker_id) VALUES (?, ?, ?, ?)';
        connection.query(insertReport, [Proof, End_date, taskId, task_taker_id], (err, result) => {
            if(err){
                console.log('error inserting report :', err)
                return res.status(400).json({err: 'error inserting report'})
            }
            return res.status(200).json('report inserted')
        })
    }catch(error){
        console.log('internal report server error :', error.message);
        res.status(500).json({error: 'internal server report error'})
    }
}
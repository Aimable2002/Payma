import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();


export const getPeople = async (req, res) => {
    try{
        const selectusers = 'SELECT * FROM USERS';
        connection.query(selectusers, (err, results) => {
            if(err){
                throw err
            }
            if(results.length === 0){
                console.log('invite friend')
                return res.status(300).json('invite friend')
            }
            //console.log('results :', results)
            return res.status(200).json(results)
        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

export const getOnPeople = async(req, res) => {
    const USERID = req.user.userId
    const selectOnPeople = 'SELECT * FROM USERS WHERE userId = ?'
    connection.query(selectOnPeople, [USERID], (err, result) => {
        if(err){
            throw err
        }
        if(result.length === 0){
            return res.status(404).json('user not fund')
        }
        return res.status(200).json(result)
    })
}

export const getUsersTask = async (req, res) => {
    try{
        const USERID = req.user.userId
        const selectUsersTask = 'SELECT * FROM USERS_TASK_VIEW';
        connection.query(selectUsersTask, (err, result) => {
            if(err){
                throw err
            }
            if(result.length === 0){
                console.log('No task yet ')
                return res.status(300).json('No task yet')
            }
            return res.status(200).json(result)
        })
    }catch(error){
        console.log('internal server error :', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}
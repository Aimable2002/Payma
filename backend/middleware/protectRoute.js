import connectDatabase from "../database/connectDatabase.js"
import jwt from 'jsonwebtoken'

const connection = connectDatabase();

export const protectRoute = async(req, res, next) => {
    try{
        const token = req.headers.authorization
        console.log(token)
        if(!token){
            return res.status(401).json('Token not found')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTH)
        console.log('decoded token :', decoded)
        if(!decoded){
            return res.status(403).json('invalid token')
        }
        const findUser = 'SELECT userId FROM USERS WHERE userId = ?';
        connection.query(findUser, [decoded.userId], (err, result) => {
            if(err){
                throw err
            }
            if(result.length === 0){
                return res.status(404).json('user not found')
            }
            req.user = result[0]
            console.log('req user in middleware :', req.user)
            next()
        })
    }catch(error){
        console.log('internal protect route error :', error.message)
        return res.status(500).json({error: 'internal server protect error'})
    }
}




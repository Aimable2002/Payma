import connectDatabase from "../database/connectDatabase.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import passport from 'passport';

const connection = connectDatabase();

export const signup = async (req, res) => {
    try{
        const {First_name, Last_name, userName, Title, Balance, Email, Phone_number, Password, confirmPassword} = req.body;

        if(!First_name || !Last_name || !userName || !Title || !Email || !Phone_number || !Password || !confirmPassword){
            return res.status(409).json('fill all the field')
        }
        if(Password !== confirmPassword){
            return res.status(409).json('password do not match')
        }
        const salt = await bcrypt.genSalt(10);
        const harshPassword = await bcrypt.hash(Password, salt)
        const existUser = 'SELECT * FROM USERS WHERE userName = ?';
        connection.query(existUser, [userName], async (err, result) => {
            if(err) {
                console.log('error on exist user')
                return res.status(409).json('userName taken')
            }
            if(result.length > 0){
                console.log('userName exist');
                return res.status(404).json('userName taken')
            }
            
            const insertUser = 'INSERT INTO users (First_name, Last_name, userName, Title, Email, Phone_number, Balance, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertUser, [First_name, Last_name, userName, Title, Email, Phone_number, Balance || 0, Password], (err, result) => {
                if(err){
                    console.log('error on insert user data :', err)
                    return res.status(409).json('error inserting user data')
                }
                const user = result
                const token = jwt.sign({userId: user.insertId}, process.env.SECRET_KEY_AUTH, {expiresIn: '30d'})
                return res.status(200).json({
                    token
                })
            })
        })
    }catch(error){
        console.log('error in signup controller :', error.message)
        res.status(500).json({error: 'internal server signup error'})
    }
}

export const login = async (req, res) => {
    try{
        const {userName, Password} = req.body

        console.log('req data :', req.body)

        if(!userName || !Password){
            return res.status(409).json('fill all the field')
        }
        
        const trackUser = 'SELECT * FROM USERS WHERE userName = ?';
        connection.query(trackUser, [userName], async (err, result) => {
            if(err){
                console.log('error tracking user');
                return res.status(400).json('internal error tracking user')
            }
            if(result.length === 0){
                console.log("user not found ")
            }

            const user = result[0];
            console.log('user :', user)
            console.log('password :', Password)
            console.log('harshed :', user?.Password)
            if(Password !== user?.Password){
                return res.status(400).json('incorrect password')
            }
            // const isPasswordTrue = await bcrypt.compare(Password, user.Password);
            // console.log('isPasswordTrue :', isPasswordTrue)
            // if(!isPasswordTrue){
            //     return res.status(400).json('incorrect password')
            // }
            const token = jwt.sign({userId: user.userId}, process.env.SECRET_KEY_AUTH, {expiresIn: '30d'})
            res.status(200).json({
                userId: user.userId,
                token
            })
        })
        
    }catch(error){
        console.log('erro in login controlla :', error.message)
        res.status(500).json({error: 'internal login server error'})
    }
}


export const logout = (req, res) => {
    try{
        res.cookie("jwt", "",  {maxAge: '0'});
        res.status(200).json("successfully logout")
    }catch(error){
        console.log("internal server logout error", error.message)
        res.status(500).json({error: "internal server logout error"})
    }
}


export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google callback route
export const googleCallback = (req, res) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Authentication failed' });
        }
        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        res.status(200).json({ token: user.token });
    })(req, res);
};
  
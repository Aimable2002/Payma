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
                return res.status(411).json({error: 'error of db', data: err.message})
            }
            if(result.length > 0){
                console.log('userName exist :', result[0].userName);
                return res.status(404).json('userName taken')
            }
            console.log('retrieved data :', result)
            const insertUser = 'INSERT INTO USERS (First_name, Last_name, userName, Title, Email, Phone_number, Balance, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertUser, [First_name, Last_name, userName, Title, Email, Phone_number, Balance || 0, Password], (err, result) => {
                if(err){
                    console.log('error on insert user data :', err)
                    return res.status(412).json('error inserting user data')
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
                console.log('error tracking user', err.message);
                return res.status(410).json({err: 'internal error tracking user', data: err.message})
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
  



// import connectDatabase from "../database/connectDatabase.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import passport from 'passport';

// const pool = connectDatabase();

// export const signup = async (req, res) => {
//     try {
//         const { First_name, Last_name, userName, Title, Balance, Email, Phone_number, Password, confirmPassword } = req.body;

//         if (!First_name || !Last_name || !userName || !Title || !Email || !Phone_number || !Password || !confirmPassword) {
//             return res.status(409).json('Fill all the fields');
//         }
//         if (Password !== confirmPassword) {
//             return res.status(409).json('Passwords do not match');
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(Password, salt);

//         // Check if the username already exists
//         const checkUserQuery = 'SELECT * FROM USERS WHERE userName = $1';
//         const { rows: existingUsers } = await pool.query(checkUserQuery, [userName]);

//         if (existingUsers.length > 0) {
//             return res.status(404).json('Username already taken');
//         }

//         // Insert new user
//         const insertUserQuery = 'INSERT INTO users (First_name, Last_name, userName, Title, Email, Phone_number, Balance, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userId';
//         const { rows: insertedUser } = await pool.query(insertUserQuery, [First_name, Last_name, userName, Title, Email, Phone_number, Balance || 0, hashedPassword]);

//         const userId = insertedUser[0].userId;
//         const token = jwt.sign({ userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '30d' });

//         return res.status(200).json({ token });
//     } catch (error) {
//         console.log('Error in signup controller:', error.message);
//         res.status(500).json({ error: 'Internal server signup error' });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { userName, Password } = req.body;

//         if (!userName || !Password) {
//             return res.status(409).json('Fill all the fields');
//         }

//         const trackUserQuery = 'SELECT * FROM USERS WHERE userName = $1';
//         const { rows: result } = await pool.query(trackUserQuery, [userName]);

//         if (result.length === 0) {
//             return res.status(400).json('User not found');
//         }

//         const user = result[0];
//         const isPasswordValid = await bcrypt.compare(Password, user.Password);

//         if (!isPasswordValid) {
//             return res.status(400).json('Incorrect password');
//         }

//         const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '30d' });
//         return res.status(200).json({ userId: user.userId, token });
//     } catch (error) {
//         console.log('Error in login controller:', error.message);
//         res.status(500).json({ error: 'Internal login server error' });
//     }
// };

// export const logout = (req, res) => {
//     try {
//         res.cookie("jwt", "", { maxAge: 0 });
//         res.status(200).json("Successfully logged out");
//     } catch (error) {
//         console.log("Internal server logout error:", error.message);
//         res.status(500).json({ error: "Internal server logout error" });
//     }
// };

// export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// // Google callback route
// export const googleCallback = (req, res) => {
//     passport.authenticate('google', (err, user, info) => {
//         if (err) {
//             return res.status(500).json({ error: 'Authentication failed' });
//         }
//         if (!user) {
//             return res.status(401).json({ error: 'User not authenticated' });
//         }
//         res.status(200).json({ token: user.token });
//     })(req, res);
// };

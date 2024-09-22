import connectDatabase from "../database/connectDatabase.js";

const connection = connectDatabase();


export const updatePassward = async(req, res) => {
    const {OldPassword, NewPassword} = req.body
    console.log('data :', req.body)
    const USERID = req.user.userId;
    console.log('user:', USERID)
    if(!OldPassword || !NewPassword){
        console.log('missing data')
        return res.status(400).json({message:'missing data'})
    }
    if(OldPassword === NewPassword){
        console.log('same data')
        return res.status(401).json({message:'same data'})
    }

    connection.beginTransaction((err) => {
        if(err){
            throw err
        }

        const checkOldPassword = 'SELECT Password FROM USERS WHERE userId = ?';
        connection.query(checkOldPassword, [USERID], (err, result) => {
            if(err){
                return connection.rollback(() => {
                    console.log('error')
                    return res.status(409).json({message: 'not found', status: false})
                })
            }
            const oldData = result[0].Password
            console.log('old data :', oldData)
            if(oldData !== OldPassword){
                return connection.rollback(() => {
                    console.log('invalid old password')
                    return res.status(403).json({message:'mismatch', status: false})
                })
            }
            console.log('password match')
            const updateNewPassword = 'UPDATE USERS SET Password = ? WHERE userId = ?';
            connection.query(updateNewPassword, [NewPassword, USERID], (err, results) => {
                if(err){
                    return connection.rollback(() => {
                        console.log('fail to update new password')
                        return res.status(401).json({message: 'fail', status: false})
                    })
                }
                connection.commit(err => {
                    if(err){
                        return connection.rollback(() => {
                            console.log('internal server')
                            return res.status(400).json({message: 'fail'})
                        })
                    }
                    return res.status(200).json({message: 'success', status: true})
                })
            })
        })
    })
}


// import connectDatabase from "../database/connectDatabase.js";

// const pool = connectDatabase(); // Use Pool for PostgreSQL connection

// export const updatePassward = async (req, res) => {
//     const { OldPassword, NewPassword } = req.body;
//     console.log('data :', req.body);
//     const USERID = req.user.userId;
//     console.log('user:', USERID);

//     if (!OldPassword || !NewPassword) {
//         console.log('missing data');
//         return res.status(400).json({ message: 'missing data' });
//     }

//     if (OldPassword === NewPassword) {
//         console.log('same data');
//         return res.status(401).json({ message: 'same data' });
//     }

//     const client = await pool.connect(); // Get a client from the pool

//     try {
//         await client.query('BEGIN'); // Start a transaction

//         // Check the old password
//         const checkOldPassword = 'SELECT "Password" FROM "USERS" WHERE "userId" = $1';
//         const result = await client.query(checkOldPassword, [USERID]);

//         if (result.rows.length === 0) {
//             await client.query('ROLLBACK'); // Rollback if user not found
//             console.log('error');
//             return res.status(409).json({ message: 'not found', status: false });
//         }

//         const oldData = result.rows[0].Password;
//         console.log('old data :', oldData);

//         if (oldData !== OldPassword) {
//             await client.query('ROLLBACK'); // Rollback if old password doesn't match
//             console.log('invalid old password');
//             return res.status(403).json({ message: 'mismatch', status: false });
//         }

//         // Update the password
//         console.log('password match');
//         const updateNewPassword = 'UPDATE "USERS" SET "Password" = $1 WHERE "userId" = $2';
//         await client.query(updateNewPassword, [NewPassword, USERID]);

//         await client.query('COMMIT'); // Commit the transaction
//         return res.status(200).json({ message: 'success', status: true });

//     } catch (error) {
//         await client.query('ROLLBACK'); // Rollback the transaction on error
//         console.log('internal server error:', error);
//         return res.status(500).json({ message: 'fail', status: false });

//     } finally {
//         client.release(); // Release the client back to the pool
//     }
// };


export const updateAll = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}


export const EditFirstName = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}

export const EditLastName = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}

export const EditUserName = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}

export const EditTitle = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}

export const EditEmail = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}

export const EditPhone = async(req, res) => {
    const data = req.body
    console.log('data :', data)
    const USERID = req.user.userId;
    console.log('user:', USERID)
}
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import jwt from 'jsonwebtoken';
// import connection from './database/connectDatabase.js';

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_SECRET_ID,
//     callbackURL: 'http://localhost:5000/api/auth/google/callback'
// },
// (accessToken, refreshToken, profile, done) => {
//     const user = {
//         googleId: profile.id,
//         firstName: profile.name.givenName,
//         lastName: profile.name.familyName,
//         email: profile.emails[0].value
//     };

//     const existUserQuery = 'SELECT * FROM USERS WHERE googleId = ?';
//     connection.query(existUserQuery, [user.googleId], (err, result) => {
//         if (err) {
//             return done(err);
//         }

//         if (result.length === 0) {
//             // User does not exist, create a new one
//             const insertUserQuery = 'INSERT INTO USERS (googleId, First_name, Last_name, Email) VALUES (?, ?, ?, ?)';
//             connection.query(insertUserQuery, [user.googleId, user.firstName, user.lastName, user.email], (err, result) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 const token = jwt.sign({ userId: result.insertId }, process.env.SECRET_KEY_AUTH, { expiresIn: '5d' });
//                 user.token = token;
//                 return done(null, user);
//             });
//         } else {
//             // User exists, proceed with existing user
//             const existingUser = result[0];
//             const token = jwt.sign({ userId: existingUser.userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '5d' });
//             user.token = token;
//             return done(null, user);
//         }
//     });
// }));

// export default passport;



import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import pool from './database/connectDatabase.js'; // Import the PostgreSQL connection pool

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: "626030012993-o5pkr83mt8bi8c4otj171b70sk75h8f0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    const user = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
    };

    const client = await pool.connect();
    try {
        // Check if user exists
        const existUserQuery = 'SELECT * FROM USERS WHERE "googleId" = $1';
        const result = await client.query(existUserQuery, [user.googleId]);

        if (result.rows.length === 0) {
            // User does not exist, create a new one
            const insertUserQuery = 'INSERT INTO USERS ("googleId", "First_name", "Last_name", "Email") VALUES ($1, $2, $3, $4) RETURNING "userId"';
            const insertResult = await client.query(insertUserQuery, [user.googleId, user.firstName, user.lastName, user.email]);
            const token = jwt.sign({ userId: insertResult.rows[0].userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '5d' });
            user.token = token;
            return done(null, user);
        } else {
            // User exists, proceed with existing user
            const existingUser = result.rows[0];
            const token = jwt.sign({ userId: existingUser.userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '5d' });
            user.token = token;
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    } finally {
        client.release();
    }
}));

export default passport;

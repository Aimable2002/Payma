import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import connectDatabase from './database/connectDatabase.js';
import jwt from 'jsonwebtoken';

const connection = connectDatabase();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/authUser/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // This callback function is executed after Google authenticates the user
  const user = {
    googleId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value
  };

  const existUserQuery = 'SELECT * FROM USERS WHERE googleId = ?';
  connection.query(existUserQuery, [user.googleId], (err, result) => {
    if (err) {
      return done(err);
    }

    if (result.length === 0) {
      // User does not exist, create a new one
      const insertUserQuery = 'INSERT INTO users (googleId, First_name, Last_name, Email) VALUES (?, ?, ?, ?)';
      connection.query(insertUserQuery, [user.googleId, user.firstName, user.lastName, user.email], (err, result) => {
        if (err) {
          return done(err);
        }
        const token = jwt.sign({ userId: result.insertId }, process.env.SECRET_KEY_AUTH, { expiresIn: '5d' });
        user.token = token;
        return done(null, user);
      });
    } else {
      // User exists, proceed with existing user
      const existingUser = result[0];
      const token = jwt.sign({ userId: existingUser.userId }, process.env.SECRET_KEY_AUTH, { expiresIn: '5d' });
      user.token = token;
      return done(null, user);
    }
  });
}));

export default passport;

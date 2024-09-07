import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import passport from "passport";
import session from "express-session";

import connectDatabase from './database/connectDatabase.js';

import authRoute from './Routes/authRoute.js'
import taskRoute from './Routes/taskRoute.js'
import reportRoute from './Routes/reportRoute.js'
import approvaRoute from './Routes/approvalRoute.js'
import walletRoute from './Routes/wallet.js'
import userRoute from './Routes/userRoute.js'

import updateRoute from './Routes/updateRoute.js'

import './passPortConfig.js'
import emailRoute from './Routes/emailRoute.js'

import BusinessRouter from './Routes/BusinessRoute.js'
import connectCloudinary from './Cloudinary/connectCloudinary.js';

import path from 'path'

const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 3000


app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors())

// app.use(cors({
//     origin: 'http://localhost:3000', // Frontend's origin
//     credentials: true // Allow credentials (cookies, authorization headers, etc.)
// }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/authUser', authRoute);
app.use('/api/task', taskRoute);
app.use('/api/report', reportRoute)
app.use('/api/approval', approvaRoute)
app.use('/api/A/C', walletRoute)
app.use('/api/user', userRoute)
app.use('/api/Update-Edit', updateRoute)

app.use('/api/email', emailRoute)
app.use('/api/business', BusinessRouter)


app.use(express.static(path.join(__dirname, "/Frontend/public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "public", "index.html"))
})



app.listen(PORT, () => {
    connectDatabase()
    connectCloudinary()
    console.log(`Server is running on port: ${PORT}`);
});


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';

import connectDatabase from './database/connectDatabase.js';

import authRoute from './Routes/authRoute.js'
import taskRoute from './Routes/taskRoute.js'
import reportRoute from './Routes/reportRoute.js'
import approvaRoute from './Routes/approvalRoute.js'
import walletRoute from './Routes/wallet.js'

import path, { resolve } from 'path'

const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 3000


app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors())


app.use('/api/authUser', authRoute);
app.use('/api/task', taskRoute);
app.use('/api/report', reportRoute)
app.use('/api/approval', approvaRoute)
app.use('/api/A/C', walletRoute)

app.use(express.static(path.join(__dirname, "Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})



app.listen(PORT, () => {
    connectDatabase()
    console.log(`Server is running on port: ${PORT}`);
});

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

const app = express();

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


app.listen(PORT, () => {
    connectDatabase()
    console.log(`Server is running on port: ${PORT}`);
});

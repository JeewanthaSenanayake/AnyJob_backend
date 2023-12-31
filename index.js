require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


const authRouters = require('./routes/authRouters');
const accountRouters = require('./routes/account');
const getWorkersRout = require('./routes/getWorker');
const requestRout = require('./routes/request');
app.use('/api/auth', authRouters);
app.use('/api/account', accountRouters)
app.use('/api/woker', getWorkersRout)
app.use('/api/request', requestRout)
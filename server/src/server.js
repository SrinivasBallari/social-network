const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./config/server-config.js');
const {MONGO_CONNECTION_URL} = require('./config/db-config.js');
const apiRoutes = require('./routes/index.js');
const cors = require('cors');

const connect = async() => {
    try {
        await mongoose.connect(MONGO_CONNECTION_URL);
    } catch (error) {
        console.log(`error in connecting to database : ${error}`);
    }
}

const runServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started on port : ${PORT}`);
        await connect();
        console.log(`connected to database`);
    });
}

runServer();
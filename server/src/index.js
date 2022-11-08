// Importing & initializg libraries & packages

const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const cookieParser = require('cookie-parser')
const redis = require('redis')
require('dotenv').config();


// const {Client} = require('pg');
// const client = new Client();

// async function connect () {
//     await client.connect();
//     client.query("SELECT datname from pg_database", (err, res) =>{
//         console.log(err ? err.stack : res);
//         client.end();
//     })
// }

// connect();

// Start

const redisClient = redis.createClient({url : process.env.REDIS_URL});


const app = express();
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.use("/api", apiRouter);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})


// Importing & initializg libraries & packages
require('dotenv').config();
const {redisClient, connectRedis} = require('./redis');

const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server);


const path = require('path');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');


async function x() {
    redisClient.set('x', 'y');
    console.log(await redisClient.get('x'));
}


connectRedis();
x();

    
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


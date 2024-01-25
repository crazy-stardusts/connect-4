// import dotenv from 'dotenv'
// dotenv.config()

require('dotenv').config()
const { connectRedis } = require('./redis');


const express = require('express');
require("express-async-errors");
const app = express();
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
})
const morgan = require('morgan')

const path = require('path');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');
const afterConnection = require('./socket');

connectRedis();
    
app.use(express.json())
app.use(cookieParser())

app.use(morgan('tiny'))

app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.use("/api", apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

io.eio.pingTimeout = 1200000;
io.eio.pingInterval = 5000;

io.on('connection', afterConnection)

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})


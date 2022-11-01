const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();

app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.get("/api", (req, res) => {
    res.status(200).json({
        status : "Success",
        data : "Test Messgae"
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})

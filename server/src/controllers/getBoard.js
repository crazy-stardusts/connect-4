const Game = require('../models/GameModel')
const {redisClient} = require('../redis')

async function getBoard(req, res) {
    console.log(req.query.id);
    let game = new Game(JSON.parse(await redisClient.get("game" + req.query.id)))
    res.status(200).json({
        data : game
    });
}

module.exports = getBoard;
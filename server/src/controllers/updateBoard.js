const Game = require('../models/GameModel')
const {redisClient} = require('../redis')

async function updateBoard(req, res) {
    let game = new Game(JSON.parse(await redisClient.get("game" + req.body.id)))
    console.log(req.body);
    game.updatePosition(req.body.col, req.body.playerIndex);
    await redisClient.set("game" + req.body.id, JSON.stringify(game))
    res.status(203).json({
        data : game
    });
}

module.exports = updateBoard;
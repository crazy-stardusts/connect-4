const Game = require('../models/GameModel')
const {redisClient} = require('../redis')

async function updateBoard(req, res) {
    let game = new Game(JSON.parse(await redisClient.get("game" + req.body.id)))
    game.updatePosition(req.body.row, req.body.col, req.body.playerIndex);
    // await redisClient.set("game" + req.body.id, JSON.stringify(game));
    res.status(203).json({
        data : game,
        get : await redisClient.get("game" + req.body.id)
    });
}

module.exports = updateBoard;
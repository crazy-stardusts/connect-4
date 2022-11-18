const Game = require('../models/GameModel');
const Player = require('../models/PlayerModel');
const {redisClient} = require('../redis')



async function newGame(req, res) {
    let playerFirst = new Player("First");
    let playerSecond = new Player("Second");
    let id = 1;
    let game = new Game(id, playerFirst, playerSecond, req.body.row, req.body.col)
    await redisClient.set("game" + id, JSON.stringify(game))
    res.status(201).json({
        data : game
    });
}

module.exports = newGame;
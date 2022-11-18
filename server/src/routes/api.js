const express = require("express");
const apiHome = require("../controllers/apiHome");
const newGame = require("../controllers/newGame");
const updateBoard = require("../controllers/updateBoard");
const apiRouter = express.Router();

apiRouter.route("").get(apiHome);
apiRouter.route("/joinGame").get(apiHome);
apiRouter.route("/board").patch(updateBoard).post(newGame);

module.exports = apiRouter;

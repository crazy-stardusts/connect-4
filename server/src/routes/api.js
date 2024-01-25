const express = require("express");
const apiHome = require("../controllers/apiHome");
const getBoard = require("../controllers/getBoard");
const newGame = require("../controllers/newGame");
const updateBoard = require("../controllers/updateBoard");
const apiRouter = express.Router();

apiRouter.route("").get(apiHome);
apiRouter.route("/joinGame").get(apiHome);
apiRouter.route("/board").patch(updateBoard).post(newGame).get(getBoard)
// apiRouter.route("/board/:id").get(getBoard);

module.exports = apiRouter;

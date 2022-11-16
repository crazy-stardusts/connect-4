const express = require('express');
const apiHome = require('../controllers/apiHome');
const apiRouter = express.Router()

apiRouter.route("").get(apiHome);
apiRouter.route("/joinGame").get(apiHome);

module.exports = apiRouter;
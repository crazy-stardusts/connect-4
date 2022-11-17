const { redisClient } = require("../redis")

apiHome = async (req, res) => {
    res.status(200).json({
        status : "Success",
        data : "Test message"
    })
}

module.exports = apiHome

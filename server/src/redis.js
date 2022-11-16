const redis = require('redis')
const redisClient = redis.createClient({url : process.env.REDIS_URL});
// console.log(redisClient);

exports.connectRedis = async function () {
    redisClient.on('connect', () => console.log("Redis Connected"))
    await redisClient.connect()
    redisClient.set("new", "hello")
    console.log(await redisClient.get("new"));
}


exports.redisClient = redisClient;
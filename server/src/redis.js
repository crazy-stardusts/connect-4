const { error } = require('console');
const redis = require('redis');
const Room = require('./models/Room');
const redisClient = redis.createClient({ url: process.env.REDIS_URL})
const redisKey = process.env.REDIS_KEY

redisClient.on("error", (err) => {
    console.error("Redis client error:", err);
});

redisClient.on("connect", () => {
    console.log("Connected to Redis server");
});

redisClient.on("end", async () => {
    console.log("Disconnected from Redis server");
    await this.connect()
});

exports.connectRedis = async function () {
    try {
        await redisClient.connect()
        await redisClient.flushAll()
        await redisClient.set("new", "hello")
        console.log(await redisClient.get("new"));
    } catch (e) {
        console.error(e.message);
    }
    
}

const proxiedRedisClient = new Proxy(redisClient, {
    get: (target, property, reciever) => {
        if (typeof target[property] === 'function') {
            return (...args) => {
                if (args.length > 0 ) {
                    args[0] = redisKey + '_' + args[0];
                }
                return Reflect.apply(target[property], target, args)
            }
        } else {
            return Reflect.get(target, property, reciever)
        }
    }
})

proxiedRedisClient.getDeserialized = async (key, cls) => {
    try {
        return Object.setPrototypeOf(JSON.parse(await redisClient.get(key)), cls.prototype);
    } catch (err) {
        console.error(err);
        return new Room();
    }
};



exports.redis = proxiedRedisClient;
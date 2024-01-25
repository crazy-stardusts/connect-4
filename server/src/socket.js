const { Socket } = require('socket.io');
const Room = require('./models/Room')
const { redis } = require("./redis");

const sortedSetKey = 'ssk'

async function getAvailableRoom() {
    let roomName = await redis.zPopMin(sortedSetKey)
    if (roomName == null) return new Room();
    let room = await redis.getDeserialized(roomName.value, Room);
    if (room.players.length == 1) return room;
    return new Room();
}

async function addAvailableRoom(room) {
    await redis.zAdd(sortedSetKey, [{score : room.players.length, value : room.name}])
}

const onDisconnect = (socket) => {
    destroyRoom(socket)
}

const afterConnection = async ( /** @type {Socket}*/ socket) => {
    try {
        console.log("Client connected using socket");
        console.log(socket.id);

        /** @type {Room}*/
        const room = await getAvailableRoom();
        room.addPlayer(socket.id);
        await redis.set(room.name, JSON.stringify(room));

        socket.join(room.name);
        socket.emit("room", room.name);

        if (room.players.length == 1) {
            await addAvailableRoom(room); 
        }

        if (room.players.length == 2) {
            socket.emit('room', room)
            socket.to(room.name).emit('room', room)
            console.log(socket);
        }

        // socket.on('disconnect', onDisconnect)

        socket.onAny((eventName, ...args) => {
            console.log(eventName, ...args);
        });
    } catch (err) {
        console.error(err);
        // Disconnect
    }
}

module.exports = afterConnection;
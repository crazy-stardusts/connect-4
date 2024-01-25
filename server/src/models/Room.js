const { default: RoomError } = require("../errors/RoomError");

class Room {
    constructor() {
        this.name = generateRoomName();
        this.players = []
        this.rows = 6;
        this.cols = 7;
        this.board = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }));
    }

    addPlayer(playerId) {
        this.players.push(playerId)
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player != playerId)
    }
}

const generateRoomName = (length = 6) => {
     const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
     let result = "";

     for (let i = 0; i < length; i++) {
         const randomChar = charset[Math.floor(Math.random() * charset.length)];
         result += randomChar;
     }

     return result;
}

module.exports = Room;
class Game {
    constructor(playerFirst, playerSecond, row, col) {
        this.playerFirst = playerFirst;
        this.playerSecond = playerSecond;
        this.row = row;
        this.col = col;
        this.boardPosition = Array(row)
            .fill(0)
            .map(() => Array(col).fill(0));
    }
}

module.exports = Game

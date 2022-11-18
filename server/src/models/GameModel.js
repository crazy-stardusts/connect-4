class Game {
    constructor(obj) {
        this.id = obj.id;
        this.playerFirst = obj.playerFirst;
        this.playerSecond = obj.playerSecond;
        this.row = obj.row;
        this.col = obj.col;
        this.boardPosition = Array(obj.row)
            .fill(0)
            .map(() => Array(obj.col).fill(0));
    }

    updatePosition(row, col, playerIndex) {
        if(row < 0 || row >= this.row || col < 0 || col >= this.col) {
            return "Error"
        }
        if(this.boardPosition[row][col] != 0) {
            return "Error"
        }
        this.boardPosition[row][col] = playerIndex;
        return this;
    }
}

module.exports = Game

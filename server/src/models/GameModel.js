class Game {
    constructor(obj) {
        if(obj == null)
        this.id = obj?.id || 1;
        this.playerFirst = obj.playerFirst;
        this.playerSecond = obj.playerSecond;
        this.row = obj?.row || 6;
        this.col = obj?.col || 7;
        this.boardPosition = obj?.boardPosition || Array(obj.row)
            .fill(0)
            .map(() => Array(obj.col).fill(0));
    }

    updatePosition(col, playerIndex) {
        let row = this.row - 1;
        while(this.boardPosition[row][col] != 0 && row > 0) --row;
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

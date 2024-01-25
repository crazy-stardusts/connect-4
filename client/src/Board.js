import React from "react";

function Board() {
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        fetch("/api/board?id=1")
            .then((res) => res.json())
            .then((res) => setState({ data: res.data, playerIndex: 1 }));
    }, []);

    function BoardCol({ col, row }) {
        return (
            <td key={col} onClick={(e) => updateBoard(col)}>
                <span className="position-relative">
                    <svg viewBox="0 0 100 100">
                        <circle
                            cx="40"
                            cy="40"
                            r="40"
                            className={
                                state.data.boardPosition[row][col] === 0
                                    ? "empty-slot"
                                    : state.data.boardPosition[row][col] === 1
                                    ? "player1-slot"
                                    : "player2-slot"
                            }
                        ></circle>
                    </svg>
                </span>
            </td>
        );
    }

    function updateBoard(col) {
        fetch("/api/board?id=1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 1,
                col: col,
                playerIndex: -state.playerIndex + 3,
            }),
        })
            .then((res) => res.json())
            .then((res) =>
                setState({
                    data: res.data,
                    playerIndex: -state.playerIndex + 3,
                })
            );
    }

    function BoardRow({ row }) {
        return (
            <tr>
                {Array(state.data.col)
                    .fill(0)
                    .map((e, i) => (
                        <BoardCol col={i} row={row} key={i} />
                    ))}
            </tr>
        );
    }
    function BoardTable() {
        console.log(state.data.col);
        return (
            <table>
                <tbody>
                    {Array(state.data.row)
                        .fill()
                        .map((e, i) => (
                            <BoardRow row={i} key={i} />
                        ))}
                </tbody>
            </table>
        );
    }

    return <div>{!state.data ? "Loading" : <BoardTable />}</div>;
}

export default Board;

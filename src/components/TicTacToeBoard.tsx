import { useState } from "react";

type BoardState = { [key: string]: string | null };

const TicTacToeBoard = () => {
    const initialBoardState = {
        A1: null,
        A2: null,
        A3: null,
        B1: null,
        B2: null,
        B3: null,
        C1: null,
        C2: null,
        C3: null,
    };
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
    const [gameVictor, setGameVictor] = useState<string | null>(null);

    const winConditions = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1","C2","C3"],["A1","B1","C1"],["A2","B2","C2"],["A3","B3","C3"],["A1","B2","C3"],["A3","B2","C1"]];

    const checkForVictory = () => {
        for (const winCondition of winConditions) {
            const cellValue0 = boardState[winCondition[0]];
            const cellValue1 = boardState[winCondition[1]];
            const cellValue2 = boardState[winCondition[2]];
            if (cellValue0 !== null && cellValue0 === cellValue1 && cellValue2 === cellValue1) {
                setGameVictor(cellValue0)
            }
        }
    }

    const onCellClick = (cellID: string) => {
        if (boardState[cellID] === null && gameVictor === null) {
            boardState[cellID] = currentPlayer;
            setBoardState(boardState);
            checkForVictory();
            if (currentPlayer === "X") {
                setCurrentPlayer("O");
            } else {
                setCurrentPlayer("X");
            }
        }
    }

    const onResetButtonClick = () => {
        setGameVictor(null);
        setBoardState(initialBoardState);
    }

    const getGameText = () => {
        if (gameVictor === null) {
            if (Object.values(boardState).every((value) => {return value !== null})) {
                return 'Nobody wins, try again!';
            }
            return `It's your turn ${currentPlayer}!`;
        }
        return `Player ${gameVictor} wins!`;
    }

    return (
        <> 
            <p className="game-text">{getGameText()}</p>
            <div className="tic-tac-toe-board">
                <div onClick={() => onCellClick("A1")} className="tic-tac-toe-cell">{boardState["A1"]}</div>
                <div onClick={() => onCellClick("A2")} className="tic-tac-toe-cell">{boardState["A2"]}</div>
                <div onClick={() => onCellClick("A3")} className="tic-tac-toe-cell">{boardState["A3"]}</div>
                <div onClick={() => onCellClick("B1")} className="tic-tac-toe-cell">{boardState["B1"]}</div>
                <div onClick={() => onCellClick("B2")} className="tic-tac-toe-cell">{boardState["B2"]}</div>
                <div onClick={() => onCellClick("B3")} className="tic-tac-toe-cell">{boardState["B3"]}</div>
                <div onClick={() => onCellClick("C1")} className="tic-tac-toe-cell">{boardState["C1"]}</div>
                <div onClick={() => onCellClick("C2")} className="tic-tac-toe-cell">{boardState["C2"]}</div>
                <div onClick={() => onCellClick("C3")} className="tic-tac-toe-cell">{boardState["C3"]}</div>
            </div>
            <button className="reset-button" onClick={onResetButtonClick}>Reset Game</button>
        </>
    ); 
}

export default TicTacToeBoard;

import React, { useState, useEffect } from "react";
//use state and useEffect are hooks from the react package, used for managing side effects and state in functional components
import Board from "./Board";
import Status from "./Status";
import "./Game.css";
//gridsize: the size of game grid, winstreak: the number of symbols in a row needed to win.

//Board: represent the game board initialized as a 2D array and filled with null values.
const Game = ({ gridSize, winStreak }) => {
  const [board, setBoard] = useState(
    Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null))
  );
  //xIsNext: a boolean state to track which player turn it is, initialiozed as true becouse x is start the game.
  //winner: store the winner initialized as null.
  //isDraw: indicate that the game ended ia a draw initialized as false.
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  //this use effect set a css variable to the --grid-size value whenever gridsize changes, it works dynamically based on the size of game grid.
  useEffect(() => {
    document.documentElement.style.setProperty("--grid-size", gridSize);
  }, [gridSize]);

  //handleClick is called when a cell is clicked. it takes row and column indexes of the clicked cell as argument. and checks for a winner or draw after each move.
  const handleClick = (row, col) => {
    if (board[row][col] || winner || isDraw) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return xIsNext ? "X" : "O";
        }
        return cell;
      })
    );

    setBoard(newBoard);
    setXIsNext(!xIsNext);

    if (checkWin(newBoard, winStreak)) {
      setWinner(xIsNext ? "X" : "O");
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
    }
  };

  //this will check the current move results in a win. it iterates through all possible direction to check if there is a winning streak.
  const checkWin = (board, winStreak) => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal \
      [1, -1], // diagonal /
    ];

    const isWinningLine = (line) => {
      return line.every((cell) => cell && cell === line[0]);
    };

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        for (let [dx, dy] of directions) {
          const line = [];
          for (let i = 0; i < winStreak; i++) {
            const x = row + i * dx;
            const y = col + i * dy;
            if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) break;
            line.push(board[x][y]);
          }
          if (line.length === winStreak && isWinningLine(line)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // tis functin checks if the game board is full and there is no winner , indicating a draw.
  const checkDraw = (board) => {
    return board.flat().every((cell) => cell !== null);
  };

  //this reset the game board and state to start a new game.
  const handleReset = () => {
    setBoard(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(null))
    );
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div>
      <h2>
        Grid Size: {gridSize}, Win Streak: {winStreak}
      </h2>
      <Board board={board} onClick={handleClick} />
      <Status
        winner={winner}
        isDraw={isDraw}
        xIsNext={xIsNext}
        onReset={handleReset}
      />
    </div>
  );
};

export default Game;

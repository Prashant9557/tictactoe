import React from "react";
import Cell from "./Cell";

//onClick: it is called when a cell is clicked . it takes the rowIndex and colIndex of the clicked cell as argument.

// the board prop is mapped over to render each row of the game board.
// for each row another map function is used to render each cell in a row.

//key: a key is generated using the row index and colindex to ensure that each cell is unique identified.
//value: the value of the cell x, o , null is passed from the board prop.
//onclick: this function is passed to handle the click event on the cell, passing the row index and col index to the occlick prop.
const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;

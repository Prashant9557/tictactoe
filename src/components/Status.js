import React from "react";

const Status = ({ winner, isDraw, xIsNext, onReset }) => {
  return (
    //if winner is true it displays a messege indicating the winner , or if isdraw is true it displays a messege inidicating a draw. if there is no winner or draw it display a messege indicating the next player.

    <div>
      {winner && <h2>Winner: {winner}</h2>}
      {isDraw && !winner && <h2>Match Draw</h2>}
      {!winner && !isDraw && <h2>Next Player: {xIsNext ? "X" : "O"}</h2>}
    </div>
  );
};

export default Status;

import React, { useState } from "react";
import Game from "./components/Game";
import "./App.css";

function App() {
  //gridsize initially set to 3, winstraek also set to 3 and start game set to false.
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    setStartGame(true);
  };

  const handlePlayAgain = () => {
    setStartGame(false);
    setGridSize(3);
    setWinStreak(3);
  };
  // this show what is rendered on th screen when the game is start

  return (
    <div className="App">
      {!startGame ? (
        <div>
          <h1>Tic-Tac-Toe</h1>
          <label>
            Grid Size (3-10):
            <input
              type="number"
              value={gridSize}
              onChange={(e) =>
                setGridSize(Math.max(3, Math.min(10, Number(e.target.value))))
              }
            />
          </label>
          <br />
          <label>
            Win Streak (3-{gridSize}):
            <input
              type="number"
              value={winStreak}
              onChange={(e) =>
                setWinStreak(
                  Math.max(3, Math.min(gridSize, Number(e.target.value)))
                )
              }
            />
          </label>
          <br />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <Game gridSize={gridSize} winStreak={winStreak} />
          <button className="play-again-button" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

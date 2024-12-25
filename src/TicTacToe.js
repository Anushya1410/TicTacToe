// Import React
import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  // State for the game board and turn
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],            // Diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const currentTurn = isXNext ? 'X' : 'O';

  // Handle click event
  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if clicked or game over

    const newBoard = [...board];
    newBoard[index] = currentTurn;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Restart game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div 
            key={index} 
            className={`cell ${cell ? 'disabled' : ''}`} 
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner ? (
        <div className="status">
          Winner: <span className="winner">{winner}</span>
        </div>
      ) : (
        <div className="status">Next Turn: {currentTurn}</div>
      )}
      <button className="restart-button" onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default TicTacToe;

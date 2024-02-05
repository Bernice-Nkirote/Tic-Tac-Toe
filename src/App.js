import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const calculateWinner = () => {
      const lines = [
        [0, 1, 2], //first row
        [3, 4, 5], //second row
        [6, 7, 8], //third row
        [0, 3, 6], //first column
        [1, 4, 7], //second column
        [2, 5, 8], //third column
        [0, 4, 8], //first diagonal
        [2, 4, 6], //second diagonal
      ];

      for (const line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };

    const winnerResult = calculateWinner();
    if (winnerResult) {
      setWinner(winnerResult);
    }
  }, [board]);

  // called when you click a square on the board
  const handleClick = (index, e) => {
    e.preventDefault();
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isNext ? 'X' : '0';
    setBoard(newBoard);
    setIsNext(!isNext);
    // this is used to toggle between the X and 0 , if true "X" if false"0"
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setIsNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button className='btn' onClick={(e) => handleClick(index, e)}>
        {board[index]}
      </button>
    );
  };

  const status = winner
    ? `Player : ${winner} takes this one!`
    : board.every((btn) => btn)
    ? `it's a draw!`
    : `Next player: ${isNext ? 'X' : '0'}`;

  return (
    <div className='board'>
      <div>
        <h1 className='title'>Tic-Tac-Toe</h1>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className='restart-btn' onClick={handleRestart}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;

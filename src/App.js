import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );

  //原先用以練習狀態存取以及透過按鈕改變狀態
  // const [value, setValue] = useState('-');

  // function handleClick() {
  //   setValue('X');
  // }

  // return (
  //   <button className="square"
  //     onClick={handleClick}
  //   >
  //     {value}
  //   </button>
  // )
}

function Board({ xIsNext, squares, onplay }) {
  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }// 檢查是否有數值在裡面了 如果有則此格不可再點選

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "x";
    }
    else {
      nextSquares[i] = "O";
    }
    onplay(nextSquares);
  }


  const winner = calculateWinner(squares);
  let status;

  if (winner === "Tie") {
    status = "Tie";
  }
  else if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // "() =>" 是為確保onSquareClick被觸發時才調用handleClick function
  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square className="square" value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square className="square" value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square className="square" value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square className="square" value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square className="square" value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square className="square" value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square className="square" value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square className="square" value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square className="square" value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;// 如果是偶數就換X
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li >
    );
  });

  return (
    <div className="game">
      <h1>
        Tic-Tac-Toe
      </h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onplay={handlePlay} />
      </div>

      <div>History Move</div>
      <div className="game-infor">
        <ol>{moves}</ol>
      </div>

    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 檢查這三個方塊的值是否相同且不為 null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  for (let i = 0; i < squares.length; i++) {
    const element = squares[i];
    if (!element) {
      return null;
    }
  }
  return "Tie";
}
import { useState } from "react";

function MyButton({value, handleClick}){
  return <button className="square" onClick={handleClick}>{value}</button>;
}

function Board({turn, squares, handlePlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [turn, setTurn] = useState(true)

  const winner = getWinner("board");
  let heading = winner ? "Winner " : "Current Player ";
  let player = winner ? winner : turn? "X" : "O";

  function handleClick(i){
    const newSquares = squares.slice();
    if(squares[i] || winner){
      return;
    }
    newSquares[i] = turn ? "X" : "O";
    // setSquares(newSquares);
    handlePlay(newSquares);
  }

  function getWinner(source){
    // console.log(source);
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

    for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a]==squares[b] && squares[b]==squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  return <>
  <div className="status">{heading} : {player}</div>
  <div className="board-row">
    <MyButton value={squares[0]} handleClick = {() => handleClick(0)}/>
    <MyButton value={squares[1]} handleClick = {() => handleClick(1)}/>
    <MyButton value={squares[2]} handleClick = {() => handleClick(2)}/>
  </div>
  <div className="board-row">
    <MyButton value={squares[3]} handleClick = {() => handleClick(3)}/>
    <MyButton value={squares[4]} handleClick = {() => handleClick(4)}/>
    <MyButton value={squares[5]} handleClick = {() => handleClick(5)}/>
  </div>
  <div className="board-row">
    <MyButton value={squares[6]} handleClick = {() => handleClick(6)}/>
    <MyButton value={squares[7]} handleClick = {() => handleClick(7)}/>
    <MyButton value={squares[8]} handleClick = {() => handleClick(8)}/>
  </div>
  </>
}

export default function Game() {
  const [turn, setTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currSquares = history[history.length-1];

  function handlePlay(newSquares){
    setHistory([...history, newSquares]);
    setTurn(!turn);
  }

  function jumpHistory(move){
    setHistory(history.slice(0,move+1));
    setTurn(move%2!=1);
  }

  let historyItems = history.map((h,i) => {
    let msg;
    if(i>0){
      msg = "Goto move #" + i;
    }else{
      msg = "Goto Start Game";
    }
    return <li key={i}><button onClick={() => jumpHistory(i)} disabled={i==history.length-1}>{msg}</button></li>});

  function toggleOrder(){
    historyItems = historyItems.sort().reverse();
    setTurn(turn);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currSquares} turn={turn} handlePlay={handlePlay}/>
      </div>
      <div className="game-info">
        <button onClick={toggleOrder}>Sort</button>
        <ol>{historyItems}</ol>
      </div>
    </div>
  );
}

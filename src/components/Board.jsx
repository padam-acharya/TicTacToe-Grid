import { useState } from "react";
import Square from "./Square";
export default function Board() {
  const [value, setValue] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [count, setCount] = useState(0);

  let winner = "";
  let nextMove = "";
  let winnerobj = calculateWinner(value);
  function handleClick(index) {
    if (value[index] || calculateWinner(value).value) {
      return;
    }
    const nextSquares = [...value];

    nextMove = xIsNext ? "X" : "O";
    nextSquares[index] = nextMove;
    setValue(nextSquares);
    setXIsNext(!xIsNext);
    setCount(count + 1);
  }

  function handleReset() {
    setValue(Array(9).fill(null));
    setXIsNext(true);
    setCount(0);
  }

  winner = winnerobj.value;

  return (
    <>
      <div className="display">
        {winner
          ? winner + " won"
          : count === 9
          ? "Draw"
          : xIsNext
          ? "X move"
          : "O move"}
      </div>
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
      <div className="container">
        {value.map((item, index) => {
          return (
            <Square
              key={index}
              value={item}
              click={() => {
                handleClick(index);
              }}
              winnerObj={winnerobj}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
}

function calculateWinner(value) {
  const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winner.length; i++) {
    const [a, b, c] = winner[i];
    if (value[a] && value[a] === value[b] && value[a] === value[c]) {
      // return value[a];
      return { value: value[a] + "", lines: winner[i] };
    }
  }
  return { value: "", lines: [] };
}

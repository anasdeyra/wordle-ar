import style from "./style.module.css";
import words from "../words.json";
import { useEffect, useState } from "react";

function Cell({ state, letter }) {
  return (
    <div
      style={{ backgroundColor: `rgb(var(--${state}))` }}
      className={style.cell}
    >
      {letter}
    </div>
  );
}

export default function Board({ tries = 5, props }) {
  return (
    <div className={style.boardContainer}>
      {props.gameBoard.map((cell) => {
        return <Cell state={cell.state} letter={cell.letter} key={cell.id} />;
      })}
    </div>
  );
}

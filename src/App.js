import { useState, useEffect } from "react";
import Board from "./components/Board.jsx";
import { Header, InputBox, GameEndModal } from "./components/UI.jsx";
import words from "./words.json";

function App({ wordle, refreshWordle }) {
  const [inputText, setInputText] = useState("");
  const [tries, setTries] = useState(5);
  const [triesLeft, setTriesLeft] = useState(tries);
  const [gameBoard, setGameBoard] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  console.log(wordle);

  function submitWord(word) {
    var tempgameBoard = gameBoard;
    for (var i = 0; i < 5; i++) {
      var index = i + currentRow * 5;
      if (word[i] === wordle[i]) tempgameBoard[index].state = "bullseye";
      else if (wordle.includes(word[i])) tempgameBoard[index].state = "match";
      else tempgameBoard[index].state = "noMatch";
      tempgameBoard[index].letter = word[i];
      setGameBoard(tempgameBoard);
    }
    if (word === wordle) {
      setGameOver(true);
      setGameWon(true);
      return;
    }
    if (triesLeft - 1 === 0) {
      setGameOver(true);
      setGameWon(false);
      return;
    }
    setCurrentRow(currentRow + 1);
    setTriesLeft(triesLeft - 1);
  }

  function restartGame() {
    refreshWordle();
    initBoard();
    setGameOver(false);
    setGameWon(false);
  }

  function filterInput(text) {
    var filteredText = "";
    for (var i = 0; i < text.length; i++) {
      if (!(text.charCodeAt(i) > 1610 || text.charCodeAt(i) < 1575))
        filteredText += text[i];
    }
    return filteredText;
  }

  function handleInput(e) {
    setInputText(filterInput(e.target.value));
  }

  function initBoard() {
    const initBoardList = [];
    setTriesLeft(tries);
    setCurrentRow(0);
    setInputText("");
    for (var i = 0; i < tries * 5; i++)
      initBoardList.push({ id: i, letter: "", state: "empty" });
    setGameBoard(initBoardList);
  }
  useEffect(initBoard, []);

  return (
    <div className="appContainer">
      <Header />
      <Board
        props={{
          wordle,
          triesLeft,
          setTriesLeft,
          gameBoard,
          setGameBoard,
          currentRow,
          setCurrentRow,
        }}
        tries={tries}
      />
      <InputBox
        onChange={handleInput}
        placeholder="enter your word"
        buttonText="Enter"
        inputText={inputText}
        submitWord={submitWord}
        setInputText={setInputText}
      />
      {gameOver && (
        <GameEndModal
          restartGame={restartGame}
          hasWon={gameWon}
          triesNumber={tries - triesLeft}
        />
      )}
    </div>
  );
}

export default App;

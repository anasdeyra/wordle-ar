import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import words from "./words.json";

function WordleGenerator() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [wordle, setWordle] = useState(words[getRandomInt(words.length)]);
  function refreshWordle() {
    setWordle(words[getRandomInt(words.length)]);
  }
  return <App refreshWordle={refreshWordle} wordle={wordle} />;
}

ReactDOM.render(<WordleGenerator />, document.getElementById("root"));

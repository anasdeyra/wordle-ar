import { useEffect, useRef } from "react";
import style from "./style.module.css";

export function Header() {
  return (
    <h1 style={{ fontSize: "3rem" }}>
      Wordle-<span style={{ color: "rgb(var(--bullseye))" }}>ar</span>
    </h1>
  );
}

export function Button({ restartGameButtonRef, onClick, active = true, text }) {
  return (
    <button
      ref={restartGameButtonRef}
      onClick={onClick}
      className={style.button}
      type="submit"
      disabled={!active}
    >
      {text}
    </button>
  );
}

export function Input({ inputText, onChange, placeholder }) {
  return (
    <input
      onChange={onChange}
      className={style.input}
      type="text"
      placeholder={placeholder}
      spellCheck="false"
      maxLength="5"
      value={inputText}
    />
  );
}

export function InputBox({
  inputText,
  onChange,
  buttonText,
  placeholder,
  buttonColor,
  submitWord,
  setInputText,
}) {
  const active = inputText.length === 5 ? true : false;
  function handleSubmit(e) {
    e.preventDefault();
    if (!active) return;
    submitWord(inputText);
    setInputText("");
  }

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <div className={style.inputBoxContainer}>
        <Input
          inputText={inputText}
          onChange={onChange}
          placeholder={placeholder}
        />
        <Button active={active} color={buttonColor} text={buttonText} />
      </div>
    </form>
  );
}

export function GameEndModal({ restartGame, hasWon = true, triesNumber = 5 }) {
  const restartGameButtonRef = useRef();
  var endText = "";
  if (hasWon) {
    if (triesNumber === 0) endText = `Bingo! you have won the Jackpot.`;
    else if (triesNumber === 1) endText = `Nice! you have won with one try.`;
    else endText = `You have won with ${triesNumber} tries!`;
  } else endText = "You have lost good luck next time!";

  const endTextHeader = (
    <h2 style={{ color: `rgb(var(--${hasWon ? "bullseye" : "error"}))` }}>
      {endText}
    </h2>
  );

  useEffect(() => {
    restartGameButtonRef.current.focus();
  }, []);
  return (
    <div className={style.modalBackground}>
      <div className={style.endGameModalContainer}>
        {endTextHeader}
        <Button
          restartGameButtonRef={restartGameButtonRef}
          onClick={restartGame}
          text={"New game"}
        />
      </div>
    </div>
  );
}

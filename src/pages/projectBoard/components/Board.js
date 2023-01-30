import React, { useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { TiPencil } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";

// styles & components
import "./Board.css";
import Card from "./Card";

const Board = ({ index, id, boardTitle, dispatch, cardIds, cardsById }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function titleChange(e) {
    dispatch({
      type: "CHANGE_BOARD_NAME",
      payload: {
        boardId: id,
        boardName: e.target.value,
      },
    });
  }
  return (
    <div className={`board board-${index}`}>
      <span className="status">
        <div className="status-title">
          <RxDotFilled className="status-icon" />
          {isEditingName ? (
            <input
              className="edit-board-title-input"
              autoFocus
              value={boardTitle}
              onChange={titleChange}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  setIsEditingName(false);
                }
              }}
            />
          ) : (
            <div
              onClick={() => {
                setIsEditingName(true);
              }}
            >
              {boardTitle}
            </div>
          )}
        </div>
        {isEditingName ? (
          <BsCheck
            className="check-icon"
            onClick={() => {
              setIsEditingName(false);
            }}
          />
        ) : (
          <TiPencil
            className="edit-icon"
            onClick={() => {
              setIsEditingName(true);
            }}
          />
        )}
      </span>
      {cardIds.map((i, index) => (
        <Card
          key={i}
          id={i}
          index={index}
          boardId={id}
          value={cardsById[i]}
          dispatch={dispatch}
        />
      ))}

      {isAddingCard ? (
        <input
          className="addCard-input"
          autoFocus
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              dispatch({
                type: "ADD_CARD",
                payload: {
                  boardId: id,
                  cardValue: inputValue.trim(),
                },
              });
              //清除input內容
              setInputValue("");
              //離開input模式
              setIsAddingCard(false);
            }
          }}
          onKeyDown={e => {
            if (e.key === "Escape") {
              setInputValue("");
              setIsAddingCard(false);
            }
          }}
        />
      ) : (
        <div className="add-card" onClick={() => setIsAddingCard(true)}>
          +
        </div>
      )}
    </div>
  );
};

export default Board;

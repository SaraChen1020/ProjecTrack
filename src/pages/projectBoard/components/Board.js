import React, { useState, useRef, useEffect } from "react";
import { useUpdateData } from "../../../hooks/useUpdateData";

// styles & components
import "./Board.css";
import Card from "./Card";
import { RxDotFilled } from "react-icons/rx";
import { TiPencil } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";

const Board = ({
  index,
  boardId,
  title,
  cardIds,
  cardsById,
  document,
  draggingItem,
  draggingBoard,
  dragOverItem,
  dragOverBoard,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { changeBoardTitle, addNewCard } = useUpdateData();
  const [boardTitle, setBoardTitle] = useState(title);

  useEffect(() => {
    setBoardTitle(title);
  }, [title]);

  async function handleAddNewCard() {
    //清除input內容
    setInputValue("");
    //離開input模式
    setIsAddingCard(false);
    addNewCard(inputValue, boardId);
  }

  const handleDragEnter = (e, boardId) => {
    dragOverBoard.current = boardId;
  };

  return (
    <div className={`board board-${index}`}>
      <span
        className="status"
        draggable
        onDragEnter={(e) => handleDragEnter(e, boardId)}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="status-title">
          <RxDotFilled className="status-icon" />
          {isEditingName ? (
            <input
              className="edit-board-title-input"
              autoFocus
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  changeBoardTitle(boardTitle, boardId);
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
              changeBoardTitle(boardTitle, boardId);
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
          boardId={boardId}
          value={cardsById[i]}
          document={document}
          draggingItem={draggingItem}
          draggingBoard={draggingBoard}
          dragOverItem={dragOverItem}
          dragOverBoard={dragOverBoard}
        />
      ))}

      {isAddingCard ? (
        <input
          className="addCard-input"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddNewCard();
            }
          }}
          onKeyDown={(e) => {
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

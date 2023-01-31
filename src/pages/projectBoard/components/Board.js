import React, { useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { TiPencil } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { projectFirestore } from "../../../utils/firebase";
import { v4 } from "uuid";

// styles & components
import "./Board.css";
import Card from "./Card";

const Board = ({ index, boardId, title, cardIds, cardsById, documents }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuthContext();
  const [boardTitle, setBoardTitle] = useState(title);

  async function changeTitle(newBoardTitle) {
    const ref = doc(projectFirestore, ` ${user.uid}`, documents.id);
    await updateDoc(ref, { [`boards.byId.${boardId}.name`]: newBoardTitle });
  }

  async function addNewCard(newCardValue) {
    //清除input內容
    setInputValue("");
    //離開input模式
    setIsAddingCard(false);

    const newCardId = v4();
    const ref = doc(projectFirestore, ` ${user.uid}`, documents.id);
    await updateDoc(ref, {
      [`boards.byId.${boardId}.cardIds`]: arrayUnion(newCardId),
      [`cards.byId.${newCardId}`]: newCardValue.trim(),
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
              onChange={e => setBoardTitle(e.target.value)}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  changeTitle(boardTitle);
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
              changeTitle(boardTitle);
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
          documents={documents}
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
              addNewCard(inputValue);
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

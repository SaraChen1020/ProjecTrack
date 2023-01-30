import React, { useState, useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer";
import { TiPencil } from "react-icons/ti";
import { projectFirestore } from "../../utils/firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// styles & components
import "./ProjectBoard.css";
import Board from "./components/Board";

export default function ProjectBoard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  function changeTitle(e) {
    dispatch({
      type: "CHANGE_TITLE",
      payload: {
        title: e.target.value,
      },
    });
  }

  return (
    <main className="project-board">
      <div className="content">
        {isEditingTitle ? (
          <input
            className="project-title-input"
            value={state.title}
            autoFocus
            onKeyPress={e => {
              if (e.key === "Enter") {
                setIsEditingTitle(false);
              }
            }}
            // 偵測文字內容改變的事件
            onChange={changeTitle}
          />
        ) : (
          <div
            className="project-title"
            onClick={() => setIsEditingTitle(true)}
          >
            {state.title}
            <TiPencil className="edit-icon" />
          </div>
        )}
        <div className="board-area">
          {state.boards.ids.map((id, index) => {
            return (
              <Board
                key={id}
                id={id}
                index={index}
                dispatch={dispatch}
                boardTitle={state.boards.byId[id].name}
                cardIds={state.boards.byId[id].cardIds}
                cardsById={state.cards.byId}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import { projectFirestore } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

// styles & components
import "./ProjectBoard.css";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";

export default function ProjectBoard() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { document, error } = useDocument(user.uid, id);
  const [projectTitle, setProjectTitle] = useState("");

  const draggingBoard = useRef();
  const dragOverBoard = useRef();
  const draggingItem = useRef();
  const dragOverItem = useRef();

  async function changeTitle(newTitle) {
    const ref = doc(projectFirestore, user.uid, document.id);
    await updateDoc(ref, { title: newTitle });
  }

  function handleTitleValue() {
    //將資料庫取出的專案標題先存在狀態中
    setProjectTitle(document.title);
    setIsEditingTitle(true);
  }

  if (!document) {
    return <div>Loading....</div>;
  }

  return (
    <main className="project-board">
      <Sidebar />
      <div className="content">
        {isEditingTitle ? (
          <input
            className="project-title-input"
            value={projectTitle}
            autoFocus
            onKeyPress={e => {
              if (e.key === "Enter") {
                changeTitle(projectTitle);
                setIsEditingTitle(false);
              }
            }}
            // 偵測文字內容改變的事件
            onChange={e => setProjectTitle(e.target.value)}
          />
        ) : (
          <div className="project-title" onClick={handleTitleValue}>
            {document.title}
            <TiPencil className="edit-icon" />
          </div>
        )}

        <div className="board-area">
          {document.boards.ids.map((id, index) => {
            return (
              <Board
                key={id}
                boardId={id}
                index={index}
                title={document.boards.byId[id].name}
                cardIds={document.boards.byId[id].cardIds}
                cardsById={document.cards.byId}
                document={document}
                draggingItem={draggingItem}
                draggingBoard={draggingBoard}
                dragOverItem={dragOverItem}
                dragOverBoard={dragOverBoard}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

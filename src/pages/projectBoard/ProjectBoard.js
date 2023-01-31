import React, { useState, useEffect } from "react";
import { TiPencil } from "react-icons/ti";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { projectFirestore } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

// styles & components
import "./ProjectBoard.css";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";

export default function ProjectBoard() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { user } = useAuthContext();
  const { documents, error } = useCollection(` ${user.uid}`);
  const [projectTitle, setProjectTitle] = useState("");

  async function changeTitle(newTitle) {
    const ref = doc(projectFirestore, ` ${user.uid}`, documents.id);
    await updateDoc(ref, { title: newTitle });
  }

  function handleTitleValue() {
    //將資料庫取出的專案標題先存在狀態中
    setProjectTitle(documents.title);
    setIsEditingTitle(true);
  }

  if (!documents) {
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
            {documents.title}
            <TiPencil className="edit-icon" />
          </div>
        )}

        <div className="board-area">
          {documents.boards.ids.map((id, index) => {
            return (
              <Board
                key={id}
                boardId={id}
                index={index}
                title={documents.boards.byId[id].name}
                cardIds={documents.boards.byId[id].cardIds}
                cardsById={documents.cards.byId}
                documents={documents}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

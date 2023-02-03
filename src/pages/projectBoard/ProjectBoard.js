import React from "react";
import { useRef } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";

// styles & components
import "./ProjectBoard.css";
import Sidebar from "./components/Sidebar";
import ProjectTitle from "./components/ProjectTitle";
import Board from "./components/Board";

export default function ProjectBoard() {
  const { id } = useParams();
  const { document, error } = useDocument(id);

  const draggingBoard = useRef();
  const dragOverBoard = useRef();
  const draggingItem = useRef();
  const dragOverItem = useRef();

  return (
    <>
      {document && (
        <main className="project-board">
          <Sidebar />
          <div className="content">
            <ProjectTitle document={document} />

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
      )}
    </>
  );
}

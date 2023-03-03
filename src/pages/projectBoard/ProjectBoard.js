import React from "react";
import { useRef, useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useUpdateData } from "../../hooks/useUpdateData";

// styles & components
import "./ProjectBoard.css";
import Sidebar from "./components/Sidebar";
import ProjectTitle from "./components/ProjectTitle";
import Board from "./components/Board";
import TitleTag from "./components/TitleTag";
import { BiPlus } from "react-icons/bi";
import { AiFillAlert } from "react-icons/ai";

export default function ProjectBoard() {
  const { document, error } = useDocument();
  const { addNewBoard } = useUpdateData();
  const [showSidebar, setShowSidebar] = useState(false);

  const draggingBoard = useRef();
  const dragOverBoard = useRef();
  const draggingItem = useRef();
  const dragOverItem = useRef();

  return (
    <div className="project">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {!showSidebar && (
        <div className="project-board">
          {!document && (
            <div className="error-message">
              <div className="alert-icon">
                <AiFillAlert />
              </div>
              <div>{error}</div>
            </div>
          )}
          {document && (
            <>
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
                        show={document.boards.byId[id].show}
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
                  {document.boards.ids.length < 4 && (
                    <div className="newBoard-area">
                      <BiPlus
                        className="newBoard"
                        onClick={() => addNewBoard()}
                      />
                    </div>
                  )}
                  <div className="hide-area">
                    <div className="hide-title">Hidden Board</div>

                    {document.boards.ids.map((id, index) => {
                      return (
                        <TitleTag
                          key={id}
                          boardId={id}
                          index={index}
                          title={document.boards.byId[id].name}
                          show={document.boards.byId[id].show}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

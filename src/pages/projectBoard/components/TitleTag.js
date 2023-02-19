import React from "react";
import { useUpdateData } from "../../../hooks/useUpdateData";

// styles & components
import { RxDotFilled } from "react-icons/rx";
import { AiOutlineEye } from "react-icons/ai";

export default function TitleTag({ title, boardId, index, show }) {
  const { showBoard } = useUpdateData();

  return (
    <>
      {!show && (
        <div className={`board-${index} title-tag`}>
          <div className="status-title tag">
            <RxDotFilled className="status-icon" />
            <div>{title}</div>
          </div>
          <div
            className="open-area"
            onClick={() => {
              showBoard(boardId);
            }}
          >
            <AiOutlineEye />
          </div>
        </div>
      )}
    </>
  );
}

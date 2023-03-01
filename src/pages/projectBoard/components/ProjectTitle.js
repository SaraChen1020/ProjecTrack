import React, { useEffect } from "react";
import { useState } from "react";
import { TiPencil } from "react-icons/ti";
import { useUpdateData } from "../../../hooks/useUpdateData";

export default function ProjectTitle({ document }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [projectTitle, setProjectTitle] = useState();
  const { changeProjectTitle } = useUpdateData();

  useEffect(() => {
    setProjectTitle(document.title);
  }, [document]);

  return (
    <>
      {isEditingTitle ? (
        <input
          className="project-title-input"
          value={projectTitle}
          autoFocus
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              changeProjectTitle(projectTitle);
              setIsEditingTitle(false);
            }
          }}
          // 偵測文字內容改變的事件
          onChange={(e) => setProjectTitle(e.target.value)}
        />
      ) : (
        <div className="project-title" onClick={() => setIsEditingTitle(true)}>
          {projectTitle}
          <TiPencil className="edit-icon" />
        </div>
      )}
    </>
  );
}

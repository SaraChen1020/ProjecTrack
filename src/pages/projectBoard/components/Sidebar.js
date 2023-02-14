import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAddProject } from "../../../hooks/useAddProject";
import { useUpdateData } from "../../../hooks/useUpdateData";

// styles & components
import "./Sidebar.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import { AiOutlineDoubleLeft } from "react-icons/ai";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const { documents, error } = useCollection("project");
  const { addProject } = useAddProject();
  const { deleteProject } = useUpdateData();
  const { docId } = useParams();

  const handleHover = () => {
    setIsHover(!isHover);
  };

  return (
    <>
      <div
        className="sidebar"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <div className="sidebar-close">
          <div className={`left-icon-div ${isHover ? "" : "none"}`}>
            <AiOutlineDoubleLeft className="left-icon" />
          </div>
        </div>

        <div className="main-title">
          My Project
          <div className="add-project" onClick={() => addProject()}>
            ＋
          </div>
        </div>
        {documents && (
          <>
            {documents.map((i) => {
              const { id, title } = i;
              return (
                <div className="link-area" key={id}>
                  <Link to={`/project/${id}`}>
                    <div
                      className={`project-link ${id == docId ? "active" : ""}`}
                    >
                      <div className="doc-icon">
                        <HiOutlineClipboardDocumentList />
                      </div>
                      <div>{title}</div>
                    </div>
                  </Link>
                  <div className={`del-icon ${id == docId ? "active" : ""}`}>
                    <BiTrash
                      className="trash-icon"
                      onClick={() => {
                        deleteProject(id);
                        navigate("/project");
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

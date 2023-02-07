import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { useAddProject } from "../../../hooks/useAddProject";

// styles & components
import "./Sidebar.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function Sidebar() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("project", user.uid);
  const { addProject } = useAddProject();
  const { id } = useParams();
  const paramsId = id;

  return (
    <>
      {documents && (
        <div className="sidebar">
          <div className="main-title">
            My Project
            <div className="add-project" onClick={() => addProject(user)}>
              ＋
            </div>
          </div>
          {documents.map((i) => {
            const { id, title } = i;
            return (
              <Link to={`/project/${id}`} key={id}>
                <div
                  className={`project-link ${id == paramsId ? "active" : ""}`}
                >
                  <div className="doc-icon">
                    <HiOutlineClipboardDocumentList />
                  </div>
                  <div>{title}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

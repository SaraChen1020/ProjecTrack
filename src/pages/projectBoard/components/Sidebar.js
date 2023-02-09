import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { useAddProject } from "../../../hooks/useAddProject";
import { useUpdateData } from "../../../hooks/useUpdateData";

// styles & components
import "./Sidebar.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { documents, error } = useCollection("project", user.uid);
  const { addProject } = useAddProject();
  const { deleteProject } = useUpdateData();
  const { id } = useParams();
  const paramsId = id;

  return (
    <>
      <div className="sidebar">
        <div className="main-title">
          My Project
          <div className="add-project" onClick={() => addProject(user)}>
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
                      className={`project-link ${
                        id == paramsId ? "active" : ""
                      }`}
                    >
                      <div className="doc-icon">
                        <HiOutlineClipboardDocumentList />
                      </div>
                      <div>{title}</div>
                    </div>
                  </Link>
                  <div className={`del-icon ${id == paramsId ? "active" : ""}`}>
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

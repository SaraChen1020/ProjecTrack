import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAddProject } from "../../../hooks/useAddProject";
import { useUpdateData } from "../../../hooks/useUpdateData";
import { useFetchUsers } from "../../../hooks/useFetchUsers";

// styles & components
import "./Sidebar.css";
import PopupAlert from "../../../components/PopupAlert";
import { HiOutlineClipboardDocumentList, HiUsers } from "react-icons/hi2";
import { BiTrash, BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BsFillPeopleFill, BsList } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const { users } = useFetchUsers();
  const navigate = useNavigate();
  const [hideSidebar, setHideSidebar] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [projectID, setProjectID] = useState("");
  const { documents, error, assigned, empty } = useCollection("project");
  const { addProject } = useAddProject();
  const { deleteProject, addProjectCoworkers, deleteProjectCoworkers } =
    useUpdateData();
  const { docId } = useParams();

  const handleHover = () => {
    setIsHover(!isHover);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
    setIsAssigned(false);
    setShowMenu(false);
    setIsSelect(false);
  };

  const handleConfirm = () => {
    deleteProject(projectID);
    navigate("/project");
  };

  const handleCancel = () => {
    setIsDeleteProject(false);
  };

  const displayStyle = {
    display: showSidebar ? "block" : "",
  };

  const iconDisplayStyle = {
    display: showSidebar ? "none" : "",
  };

  return (
    <>
      <div
        className={`right-icon-div ${hideSidebar ? "" : "none"}`}
        onClick={() => setHideSidebar(false)}
      >
        <AiOutlineDoubleRight className="right-icon" />
      </div>
      <div className="mobile-list" style={iconDisplayStyle}>
        <BsList
          onClick={() => {
            setShowSidebar(true);
          }}
        />
      </div>
      <div
        className={`sidebar ${hideSidebar ? "none" : ""}`}
        style={displayStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <div className="sidebar-close">
          <div
            className={`left-icon-div ${isHover ? "" : "hidden"}`}
            onClick={() => setHideSidebar(true)}
          >
            <AiOutlineDoubleLeft className="left-icon" />
          </div>
        </div>

        <div className="mobile-sidebar-close">
          <AiOutlineDoubleLeft
            className="left-icon-div"
            onClick={() => {
              setShowSidebar(false);
            }}
          />
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
              const { id, title, coworkers } = i;
              return (
                <div className="link-area" key={id}>
                  <Link to={`/project/${id}`}>
                    <div
                      className={`project-link ${id == docId ? "active" : ""}`}
                    >
                      <div className="doc-icon">
                        {coworkers.length != 0 && <BsFillPeopleFill />}
                        {coworkers.length == 0 && (
                          <HiOutlineClipboardDocumentList />
                        )}
                      </div>
                      <div className="title">{title}</div>
                    </div>
                  </Link>
                  <div className={`more ${id == docId ? "active" : ""}`}>
                    <div
                      className={`more-icon-area ${
                        id == docId ? "" : "hidden"
                      }`}
                      onClick={handleShowMore}
                    >
                      <BiDotsHorizontalRounded
                        className={`more-icon ${id == docId ? "" : "hidden"}`}
                      />
                    </div>
                    {showMore && id == docId && (
                      <div className="function-area">
                        <div
                          className="function delete"
                          onClick={() => {
                            setIsDeleteProject(true);
                            setProjectID(id);
                            setShowMore(false);
                          }}
                        >
                          <BiTrash className="function-icon" />
                          <div>Delete this project</div>
                        </div>
                        <div
                          className="function addAssign"
                          onClick={() => {
                            setIsAssigned(true);
                            setProjectID(id);
                            setShowMore(false);
                          }}
                        >
                          <HiUsers className="function-icon" />
                          <div>Assign to...</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {isAssigned && id == docId && (
                    <>
                      <div className="select-area">
                        {!isSelect && (
                          <div
                            className="select"
                            onClick={() => {
                              setShowMenu(true);
                              setIsSelect(true);
                            }}
                          >
                            {coworkers.length == 0 && "Select user..."}
                            {coworkers.length != 0 &&
                              coworkers.map((doc) => {
                                const { displayName, uid } = doc;
                                return (
                                  <div key={uid} className="name-content">
                                    <div className="name-icon">
                                      {displayName[0].toUpperCase()}
                                    </div>
                                    <div>{displayName}</div>
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        {isSelect && (
                          <div
                            className="select"
                            onClick={() => {
                              setShowMenu(true);
                              setIsSelect(true);
                            }}
                          >
                            {coworkers.length == 0 && "Select user..."}
                            {coworkers.length != 0 &&
                              coworkers.map((member) => {
                                const { displayName, uid } = member;
                                return (
                                  <div key={uid} className="name-content">
                                    <div className="name-icon">
                                      {displayName[0].toUpperCase()}
                                    </div>
                                    <div>{displayName}</div>
                                    <div
                                      className="close-icon"
                                      onClick={() => {
                                        deleteProjectCoworkers(member);
                                      }}
                                    >
                                      <IoIosClose />
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        {showMenu && (
                          <ul className="user-menu">
                            {users
                              .filter((allUser) => {
                                return !coworkers.find(
                                  (user) =>
                                    user.uid === allUser.uid &&
                                    user.name === allUser.name
                                );
                              })
                              .map((member) => {
                                const { displayName, uid } = member;
                                return (
                                  <li
                                    key={uid}
                                    className="option"
                                    onClick={() => {
                                      addProjectCoworkers(member);
                                    }}
                                  >
                                    <div className="name-icon">
                                      {displayName[0].toUpperCase()}
                                    </div>
                                    <div>{displayName}</div>
                                  </li>
                                );
                              })}
                            <div
                              className="btn"
                              onClick={() => {
                                setIsAssigned(false);
                                setShowMenu(false);
                                setIsSelect(false);
                              }}
                            >
                              Close
                            </div>
                          </ul>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}

        {isDeleteProject && (
          <div className="card-backdrop">
            <PopupAlert
              message="Are you sure you want to delete this project?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              alert={true}
            />
          </div>
        )}

        {!empty && assigned && (
          <>
            <div className="main-title team-title">Team Project</div>
            {assigned.map((i) => {
              const { id, title } = i;
              return (
                <div className="link-area" key={id}>
                  <Link to={`/project/${id}`}>
                    <div
                      className={`project-link ${id == docId ? "active" : ""}`}
                    >
                      <div className="doc-icon">
                        <BsFillPeopleFill />
                      </div>
                      <div className="title">{title}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

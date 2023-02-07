import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// styles & components
import "./CardInformation.css";
import DatePicker from "react-datepicker";
import {
  BiLoader,
  BiCalendar,
  BiUserCircle,
  BiTime,
  BiImageAdd,
} from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";

export default function CardInformation({
  id,
  index,
  boardId,
  value,
  document,
  setShowInformation,
  dueDate,
  setDueDate,
}) {
  const navigate = useNavigate();
  const cardStatus = document.boards.byId[boardId].name;
  const cardDueDate = new Date(value.dueDate);
  const date = new Date(value.createdTime.toDate().toString());
  const createdTime = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // useEffect(() => {
  //   navigate(`/project/${document.id}/${id}`);
  // }, []);

  return (
    <div className="card-backdrop">
      <div className="card-info">
        <h2>{value.cardTitle}</h2>
        <ul className="project-detail">
          <li className="project-row">
            <div className="row-title">
              <BiLoader className="project-column-icon" />
              <p className="project-name">Status</p>
            </div>
            <div className="row-content">
              <div className="status-title">
                <RxDotFilled className="status-icon" />
                {cardStatus}
              </div>
            </div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiCalendar className="project-column-icon" />
              <p className="project-name">Due</p>
            </div>
            <div className="row-content">
              <DatePicker
                selected={dueDate}
                dateFormat="MMMM d, yyyy"
                className="datepicker"
              />
            </div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiUserCircle className="project-column-icon" />
              <p className="project-name">Created By</p>
            </div>
            <div className="row-content">{value.createdBy}</div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiTime className="project-column-icon" />
              <p className="project-name">Created Time</p>
            </div>
            <div className="row-content">{createdTime}</div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiImageAdd className="project-column-icon" />
              <p className="project-name">Images</p>
            </div>
            <div className="row-content"></div>
          </li>
        </ul>
        <button onClick={() => setShowInformation(false)}>close</button>
      </div>
    </div>
  );
}

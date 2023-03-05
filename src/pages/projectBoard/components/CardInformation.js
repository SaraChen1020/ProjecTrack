import React from "react";
import { useEffect, useState } from "react";
import { useUpdateData } from "../../../hooks/useUpdateData";

// styles & components
import "./CardInformation.css";
import SelectUser from "./SelectUser";
import ReactMarkdown from "react-markdown";
import DatePicker from "react-datepicker";
import { BiLoader, BiCalendar, BiUserCircle, BiTime } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";

export default function CardInformation({
  cardId,
  boardId,
  cardValue,
  document,
  setShowInformation,
  dueDate,
  setDueDate,
}) {
  const { updateCardInfo, changeCardDueDate, changeCardTitle } =
    useUpdateData();
  const cardStatus = document.boards.byId[boardId].name;
  const createdDate = new Date(cardValue.createdTime.toDate().toString());
  const createdTime = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const editDate = new Date(cardValue.lastEditedTime.toDate().toString());
  const lastEditedTime = editDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(cardValue.cardTitle);
  const [markdownText, setMarkdownText] = useState(cardValue.content);

  useEffect(() => {
    setCardTitle(cardValue.cardTitle);
  }, [cardValue.cardTitle]);

  useEffect(() => {
    setMarkdownText(cardValue.content);
  }, [cardValue.content]);

  return (
    <div className="card-backdrop">
      <div className="card-info">
        {isEditing ? (
          <input
            className="cardTitle-input"
            autoFocus
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                changeCardTitle(cardTitle, cardId);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{cardTitle}</h2>
        )}

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
                onChange={(date) => {
                  setDueDate(date);
                  changeCardDueDate(date.toString(), cardId);
                }}
              />
            </div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiUserCircle className="project-column-icon" />
              <p className="project-name">Assign To</p>
            </div>
            <div className="row-content">
              <SelectUser cardId={cardId} document={document} />
            </div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiUserCircle className="project-column-icon" />
              <p className="project-name">Created By</p>
            </div>
            <div className="row-content">
              <div className="name-icon">
                {cardValue.createdBy[0].toUpperCase()}
              </div>
              <div>{cardValue.createdBy}</div>
            </div>
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
              <BiUserCircle className="project-column-icon" />
              <p className="project-name">Last Edited By</p>
            </div>
            <div className="row-content">
              <div className="name-icon">
                {cardValue.lastEditedUser[0].toUpperCase()}
              </div>
              <div>{cardValue.lastEditedUser}</div>
            </div>
          </li>
          <li className="project-row">
            <div className="row-title">
              <BiTime className="project-column-icon" />
              <p className="project-name">Last Edited Time</p>
            </div>
            <div className="row-content">{lastEditedTime}</div>
          </li>
        </ul>

        <div className="project-content">
          <div className="text">
            <h3 className="text-title">Type here</h3>
            <textarea
              value={markdownText}
              onChange={(e) => {
                setMarkdownText(e.target.value);
              }}
              className="markdown-input"
            />
          </div>
          <div className="text">
            <h3 className="text-title">Preview content</h3>
            <ReactMarkdown
              children={markdownText}
              className="markdown-preview"
            />
          </div>
        </div>

        <div
          className="save-btn"
          onClick={() => {
            setShowInformation(false);
            updateCardInfo(cardId, cardTitle, markdownText);
          }}
        >
          儲存
        </div>
      </div>
    </div>
  );
}

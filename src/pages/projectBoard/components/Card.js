import React, { useState, useEffect } from "react";
import { useUpdateData } from "../../../hooks/useUpdateData";
import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../../../utils/firebase";

// styles & components
import "./Card.css";
import { TiClipboard } from "react-icons/ti";
import { BiTrash } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardInformation from "./CardInformation";

const Card = ({
  id,
  index,
  boardId,
  value,
  document,
  draggingItem,
  draggingBoard,
  dragOverItem,
  dragOverBoard,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [cardTitle, setCardTitle] = useState(value.cardTitle);
  const [dueDate, setDueDate] = useState(new Date(value.dueDate));
  const [showInformation, setShowInformation] = useState(false);
  const { deleteCard, changeCardDueDate } = useUpdateData();
  const ref = doc(projectFirestore, "project", document.id);

  useEffect(() => {
    setCardTitle(value.cardTitle);
    setDueDate(new Date(value.dueDate));
  }, [value]);

  const handleDragStart = (e, index, boardId) => {
    draggingItem.current = index;
    draggingBoard.current = boardId;
  };

  const handleDragEnter = (e, index, boardId) => {
    dragOverItem.current = index;
    dragOverBoard.current = boardId;
  };

  const handleDragEnd = async (e) => {
    const dragList = document.boards.byId[draggingBoard.current].cardIds;
    const overList = document.boards.byId[dragOverBoard.current].cardIds;

    const draggingItemContent = dragList[draggingItem.current];
    //移除drag元素原本所處的list位置
    dragList.splice(draggingItem.current, 1);

    if (draggingBoard.current == dragOverBoard.current) {
      //在同一個看板中移動順序
      dragList.splice(dragOverItem.current, 0, draggingItemContent);
      await updateDoc(ref, {
        [`boards.byId.${draggingBoard.current}.cardIds`]: dragList,
      });
    } else if (draggingBoard.current !== dragOverBoard.current) {
      //在不同看板中移動，先更新dragList，在下一個判斷式再處理overList的更新
      await updateDoc(ref, {
        [`boards.byId.${draggingBoard.current}.cardIds`]: dragList,
      });
    }

    if (
      draggingBoard.current !== dragOverBoard.current &&
      dragOverItem.current == overList.length - 1
    ) {
      //如果移到其他看板的最後一個時，overList使用push推入新元素
      overList.push(draggingItemContent);
      await updateDoc(ref, {
        [`boards.byId.${dragOverBoard.current}.cardIds`]: overList,
      });
    } else if (draggingBoard.current !== dragOverBoard.current) {
      //如果移到其他看板且是插入別的順序時，overList使用splice插入新元素
      overList.splice(dragOverItem.current, 0, draggingItemContent);
      await updateDoc(ref, {
        [`boards.byId.${dragOverBoard.current}.cardIds`]: overList,
      });
    }
  };
  return (
    <>
      <ul className="card-area">
        <li
          className={`card card-${index}`}
          // drag and drop props
          onDragStart={(e) => handleDragStart(e, index, boardId)}
          onDragEnter={(e) => handleDragEnter(e, index, boardId)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
          draggable
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div>{cardTitle}</div>

          {/* 滑入顯示編輯區 */}
          {isHover && (
            <div className="edit-block">
              <div
                className="show-board"
                onClick={() => {
                  setShowInformation(true);
                }}
              >
                <TiClipboard />
              </div>
              <div
                className="delete-card"
                onClick={() => {
                  deleteCard(boardId, id);
                }}
              >
                <BiTrash className="trash-icon" />
              </div>
            </div>
          )}

          {/* 編輯日期區 */}
          <div className="dueDate">
            <DatePicker
              selected={dueDate}
              onChange={(date) => {
                setDueDate(date);
                changeCardDueDate(date.toString(), id);
              }}
              dateFormat="MMM dd"
              className="datepicker"
            />
          </div>
        </li>
      </ul>
      {showInformation && (
        <CardInformation
          id={id}
          index={index}
          boardId={boardId}
          value={value}
          document={document}
          setShowInformation={setShowInformation}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
      )}
    </>
  );
};

export default Card;

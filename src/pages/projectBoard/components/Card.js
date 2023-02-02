import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../../../utils/firebase";

// styles
import "./Card.css";

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
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(value);
  const ref = doc(projectFirestore, user.uid, document.id);

  async function changeTitle(newCardTitle) {
    await updateDoc(ref, { [`cards.byId.${id}`]: newCardTitle });
  }

  const handleDragStart = (e, index, boardId) => {
    draggingItem.current = index;
    draggingBoard.current = boardId;
  };

  const handleDragEnter = (e, index, boardId) => {
    dragOverItem.current = index;
    dragOverBoard.current = boardId;
  };

  const handleDragEnd = async e => {
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
    <ul className="card-area">
      {isEditing ? (
        <input
          autoFocus
          value={cardTitle}
          onChange={e => setCardTitle(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              changeTitle(cardTitle);
              setIsEditing(false);
            }
          }}
          // drag and drop props
          draggable
          onDragStart={e => {
            e.preventDefault();
          }}
        />
      ) : (
        <li
          className={`card card-${index}`}
          onClick={() => {
            setIsEditing(true);
          }}
          // drag and drop props
          onDragStart={e => handleDragStart(e, index, boardId)}
          onDragEnter={e => handleDragEnter(e, index, boardId)}
          onDragEnd={handleDragEnd}
          onDragOver={e => e.preventDefault()}
          draggable
        >
          {cardTitle}
        </li>
      )}
    </ul>
  );
};

export default Card;

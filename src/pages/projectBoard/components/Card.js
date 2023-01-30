import React, { useState } from "react";

// styles
import "./Card.css";

const Card = ({ id, index, boardId, value, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);

  function contentChange(e) {
    dispatch({
      type: "CHANGE_CARD_VALUE",
      payload: {
        cardValue: e.target.value,
        cardId: id,
        boardId: boardId,
      },
    });
  }

  return (
    <ul className="card-area">
      {isEditing ? (
        <input
          autoFocus
          value={value}
          onChange={contentChange}
          onKeyPress={e => {
            if (e.key === "Enter") {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <li
          className={`card card-${index}`}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value}
        </li>
      )}
    </ul>
  );
};

export default Card;

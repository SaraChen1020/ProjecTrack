import React, { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../../../utils/firebase";

// styles
import "./Card.css";

const Card = ({ id, index, boardId, value, documents }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(value);
  const { user } = useAuthContext();

  async function changeTitle(newCardTitle) {
    const ref = doc(projectFirestore, ` ${user.uid}`, documents.id);
    await updateDoc(ref, { [`cards.byId.${id}`]: newCardTitle });
  }

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
        />
      ) : (
        <li
          className={`card card-${index}`}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {cardTitle}
        </li>
      )}
    </ul>
  );
};

export default Card;

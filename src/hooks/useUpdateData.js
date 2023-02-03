import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../utils/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 } from "uuid";

export const useUpdateData = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const ref = doc(projectFirestore, user.uid, id);

  const changeProjectTitle = async (newTitle) => {
    await updateDoc(ref, { title: newTitle });
  };

  const changeBoardTitle = async (newBoardTitle, boardId) => {
    await updateDoc(ref, { [`boards.byId.${boardId}.name`]: newBoardTitle });
  };

  const addNewCard = async (newCardValue, boardId) => {
    const newCardId = v4();
    await updateDoc(ref, {
      [`boards.byId.${boardId}.cardIds`]: arrayUnion(newCardId),
      [`cards.byId.${newCardId}`]: newCardValue.trim(),
    });
  };

  const changeCardTitle = async (newCardTitle, cardId) => {
    await updateDoc(ref, { [`cards.byId.${cardId}`]: newCardTitle });
  };

  return { changeProjectTitle, changeBoardTitle, addNewCard, changeCardTitle };
};
import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  arrayRemove,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

export const useUpdateData = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const ref = doc(projectFirestore, "project", id);

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
      [`cards.byId.${newCardId}.cardTitle`]: newCardValue.trim(),
      [`cards.byId.${newCardId}.dueDate`]: new Date().toString(),
      [`cards.byId.${newCardId}.createdBy`]: user.displayName,
      [`cards.byId.${newCardId}.createdTime`]: Timestamp.now(),
      [`cards.byId.${newCardId}.images`]: [],
    });
  };

  const deleteCard = async (boardId, cardId) => {
    await updateDoc(ref, {
      [`boards.byId.${boardId}.cardIds`]: arrayRemove(cardId),
      [`cards.byId.${cardId}`]: deleteField(),
    });
  };

  const changeCardTitle = async (newCardTitle, cardId) => {
    await updateDoc(ref, { [`cards.byId.${cardId}.cardTitle`]: newCardTitle });
  };

  const changeCardDueDate = async (newCardDueDate, cardId) => {
    await updateDoc(ref, { [`cards.byId.${cardId}.dueDate`]: newCardDueDate });
  };

  const updateCardContent = async (newCardContent, cardId) => {
    await updateDoc(ref, { [`cards.byId.${cardId}.content`]: newCardContent });
  };

  const deleteProject = async (docId) => {
    await deleteDoc(doc(projectFirestore, "project", docId));
  };

  return {
    changeProjectTitle,
    changeBoardTitle,
    addNewCard,
    deleteCard,
    changeCardTitle,
    changeCardDueDate,
    updateCardContent,
    deleteProject,
  };
};

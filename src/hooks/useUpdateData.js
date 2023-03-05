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
  const { docId } = useParams();
  const ref = doc(projectFirestore, "project", docId);

  const changeProjectTitle = async (newTitle) => {
    await updateDoc(ref, { title: newTitle });
  };

  const changeBoardTitle = async (newBoardTitle, boardId) => {
    await updateDoc(ref, { [`boards.byId.${boardId}.name`]: newBoardTitle });
  };

  const hideBoard = async (boardId) => {
    await updateDoc(ref, { [`boards.byId.${boardId}.show`]: false });
  };

  const showBoard = async (boardId) => {
    await updateDoc(ref, { [`boards.byId.${boardId}.show`]: true });
  };

  const addNewBoard = async () => {
    const newBoardID = "three";
    await updateDoc(ref, {
      ["boards.ids"]: arrayUnion(newBoardID),
      [`boards.byId.${newBoardID}`]: {
        name: "Untitled",
        cardIds: [],
        show: true,
      },
    });
  };

  const addNewCard = async (newCardValue, boardId) => {
    const newCardId = v4();
    await updateDoc(ref, {
      [`boards.byId.${boardId}.cardIds`]: arrayUnion(newCardId),
      [`cards.byId.${newCardId}.cardTitle`]: newCardValue.trim(),
      [`cards.byId.${newCardId}.dueDate`]: new Date().toString(),
      [`cards.byId.${newCardId}.createdBy`]: user.displayName,
      [`cards.byId.${newCardId}.createdTime`]: Timestamp.now(),
      [`cards.byId.${newCardId}.lastEditedTime`]: Timestamp.now(),
      [`cards.byId.${newCardId}.lastEditedUser`]: user.displayName,
      [`cards.byId.${newCardId}.assignTo`]: [],
      [`cards.byId.${newCardId}.content`]: `### Write something with markdown
---
- 
- 
---
*Note:something note...*`,
    });
  };

  const deleteCard = async (boardId, cardId) => {
    await updateDoc(ref, {
      [`boards.byId.${boardId}.cardIds`]: arrayRemove(cardId),
      [`cards.byId.${cardId}`]: deleteField(),
    });
  };

  const changeCardTitle = async (newCardTitle, cardId) => {
    await updateDoc(ref, {
      [`cards.byId.${cardId}.cardTitle`]: newCardTitle,
      [`cards.byId.${cardId}.lastEditedTime`]: Timestamp.now(),
      [`cards.byId.${cardId}.lastEditedUser`]: user.displayName,
    });
  };

  const changeCardDueDate = async (newCardDueDate, cardId) => {
    await updateDoc(ref, {
      [`cards.byId.${cardId}.dueDate`]: newCardDueDate,
      [`cards.byId.${cardId}.lastEditedTime`]: Timestamp.now(),
      [`cards.byId.${cardId}.lastEditedUser`]: user.displayName,
    });
  };

  const updateCardInfo = async (cardId, newCardTitle, newCardContent) => {
    await updateDoc(ref, {
      [`cards.byId.${cardId}.cardTitle`]: newCardTitle,
      [`cards.byId.${cardId}.content`]: newCardContent,
      [`cards.byId.${cardId}.lastEditedTime`]: Timestamp.now(),
      [`cards.byId.${cardId}.lastEditedUser`]: user.displayName,
    });
  };

  const addCardAssigner = async (cardId, assignInfo) => {
    await updateDoc(ref, {
      [`cards.byId.${cardId}.assignTo`]: arrayUnion(assignInfo),
      [`cards.byId.${cardId}.lastEditedTime`]: Timestamp.now(),
      [`cards.byId.${cardId}.lastEditedUser`]: user.displayName,
    });
  };

  const deleteCardAssigner = async (cardId, assignInfo) => {
    await updateDoc(ref, {
      [`cards.byId.${cardId}.assignTo`]: arrayRemove(assignInfo),
      [`cards.byId.${cardId}.lastEditedTime`]: Timestamp.now(),
      [`cards.byId.${cardId}.lastEditedUser`]: user.displayName,
    });
  };

  const addProjectCoworkers = async (coworkers) => {
    await updateDoc(ref, {
      ["coworkers"]: arrayUnion(coworkers),
    });
  };

  const deleteProjectCoworkers = async (coworkers) => {
    await updateDoc(ref, {
      ["coworkers"]: arrayRemove(coworkers),
    });
  };

  const deleteProject = async (docId) => {
    await deleteDoc(doc(projectFirestore, "project", docId));
  };

  return {
    changeProjectTitle,
    changeBoardTitle,
    hideBoard,
    showBoard,
    addNewBoard,
    addNewCard,
    deleteCard,
    changeCardTitle,
    changeCardDueDate,
    updateCardInfo,
    addCardAssigner,
    deleteCardAssigner,
    addProjectCoworkers,
    deleteProjectCoworkers,
    deleteProject,
  };
};

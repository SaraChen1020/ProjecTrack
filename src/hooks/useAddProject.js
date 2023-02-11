import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectFirestore } from "../utils/firebase";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";

export const useAddProject = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProject = async () => {
    setIsLoading(true);
    setError(null);

    const docData = {
      title: "專案標題",
      createdAt: Timestamp.now(),
      owner: user.uid,
      coworkers: [],
      boards: {
        ids: ["zero", "one", "two"],
        byId: {
          zero: {
            name: "待處理",
            cardIds: ["card1"],
          },
          one: {
            name: "進行中",
            cardIds: ["card2"],
          },
          two: {
            name: "已完成",
            cardIds: ["card3"],
          },
        },
      },
      cards: {
        byId: {
          card1: {
            cardTitle: "待處理1",
            dueDate: new Date().toString(),
            createdBy: user.displayName,
            createdTime: Timestamp.now(),
            lastEditedTime: Timestamp.now(),
            lastEditedUser: user.displayName,
            content: "",
            assignTo: [],
          },
          card2: {
            cardTitle: "進行中1",
            dueDate: new Date().toString(),
            createdBy: user.displayName,
            createdTime: Timestamp.now(),
            lastEditedTime: Timestamp.now(),
            lastEditedUser: user.displayName,
            content: "",
            assignTo: [],
          },
          card3: {
            cardTitle: "已完成1",
            dueDate: new Date().toString(),
            createdBy: user.displayName,
            createdTime: Timestamp.now(),
            lastEditedTime: Timestamp.now(),
            lastEditedUser: user.displayName,
            content: "",
            assignTo: [],
          },
        },
      },
    };

    try {
      const newCollectionRef = doc(collection(projectFirestore, "project"));

      await setDoc(newCollectionRef, docData);

      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { addProject, isLoading, error };
};

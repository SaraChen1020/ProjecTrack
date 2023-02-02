import { useState } from "react";
import { projectFirestore } from "../utils/firebase";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";

export const useAddProject = () => {
  const docData = {
    title: "專案標題",
    createdAt: Timestamp.now(),
    boards: {
      ids: ["zero", "one", "two"],
      byId: {
        zero: {
          name: "待處理",
          cardIds: ["card1", "card2"],
        },
        one: {
          name: "進行中",
          cardIds: ["card3", "card4"],
        },
        two: {
          name: "已完成",
          cardIds: ["card5", "card6"],
        },
      },
    },
    cards: {
      byId: {
        card1: "待處理1",
        card2: "待處理2",
        card3: "進行中1",
        card4: "進行中2",
        card5: "已完成1",
        card6: "已完成2",
      },
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProject = async uid => {
    setIsLoading(true);
    setError(null);

    try {
      const newCollectionRef = doc(collection(projectFirestore, uid));

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

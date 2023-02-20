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
      title: "Project Title",
      createdAt: Timestamp.now(),
      owner: user.uid,
      ownerName: user.displayName,
      coworkers: [],
      boards: {
        ids: ["zero", "one", "two"],
        byId: {
          zero: {
            name: "Not Started",
            cardIds: ["card1"],
            show: true,
          },
          one: {
            name: "In Progress",
            cardIds: ["card2"],
            show: true,
          },
          two: {
            name: "Finished",
            cardIds: ["card3"],
            show: true,
          },
        },
      },
      cards: {
        byId: {
          card1: {
            cardTitle: "Untitled 1",
            dueDate: new Date().toString(),
            createdBy: user.displayName,
            createdTime: Timestamp.now(),
            lastEditedTime: Timestamp.now(),
            lastEditedUser: user.displayName,
            content: "",
            assignTo: [],
          },
          card2: {
            cardTitle: "Untitled 2",
            dueDate: new Date().toString(),
            createdBy: user.displayName,
            createdTime: Timestamp.now(),
            lastEditedTime: Timestamp.now(),
            lastEditedUser: user.displayName,
            content: "",
            assignTo: [],
          },
          card3: {
            cardTitle: "Untitled 3",
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

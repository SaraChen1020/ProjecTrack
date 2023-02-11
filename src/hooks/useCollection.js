import { projectFirestore } from "../utils/firebase";
import { useAuthContext } from "./useAuthContext";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useReducer, useEffect } from "react";

export const useCollection = (table) => {
  const [documents, setDocuments] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const ref = collection(projectFirestore, table);
    const q = query(
      ref,
      where("owner", "==", user.uid),
      orderBy("createdAt", "asc")
    );

    //使用onSnapshot快照取得實時更新的資料
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No document");
          setError("No project selected");
        } else {
          let results = [];
          querySnapshot.forEach((doc) => {
            // setDocuments({ id: doc.id, ...doc.data() });
            results.push({ id: doc.id, ...doc.data() });
          });

          // update state
          setError(null);
          setDocuments(results);
        }
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unSub();
  }, []);

  return { documents, error };
};

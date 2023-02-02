import { projectFirestore } from "../utils/firebase";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useState, useReducer, useEffect } from "react";

export const useDocument = (uid, docId) => {
  const [document, setDocument] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = doc(projectFirestore, uid, docId);
    //使用onSnapshot快照取得實時更新的資料
    const unSub = onSnapshot(
      ref,
      doc => {
        setDocument("");
        if (doc.empty) {
          console.log("No document");
        } else {
          setDocument({ id: doc.id, ...doc.data() });

          // update state
          setError(null);
        }
      },
      error => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unSub();
  }, [docId]);

  return { document, error };
};

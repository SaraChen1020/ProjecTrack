import { projectFirestore } from "../utils/firebase";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useState, useReducer, useEffect } from "react";

export const useCollection = uid => {
  const [documents, setDocuments] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // collection ref ( user's own collection)
    let ref = collection(projectFirestore, uid);

    //使用onSnapshot快照取得實時更新的資料
    const unSub = onSnapshot(
      ref,
      querySnapshot => {
        if (querySnapshot.empty) {
          console.log("No document");
        } else {
          let results = [];
          querySnapshot.forEach(doc => {
            // setDocuments({ id: doc.id, ...doc.data() });
            results.push({ id: doc.id, ...doc.data() });
          });

          // update state
          setError(null);
          setDocuments(results);
        }
      },
      error => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unSub();
  }, []);

  return { documents, error };
};

import { projectFirestore } from "../utils/firebase";
import { useAuthContext } from "./useAuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export const useCollection = (table) => {
  const [documents, setDocuments] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [assigned, setAssigned] = useState("");
  const [empty, setEmpty] = useState(false);

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

  //查詢自己被標註的專案
  useEffect(() => {
    const ref = collection(projectFirestore, table);
    const q = query(
      ref,
      where("coworkers", "array-contains", {
        uid: user.uid,
        displayName: user.displayName,
      }),
      where("owner", "!=", user.uid),
      orderBy("owner"),
      orderBy("createdAt", "asc")
    );

    //使用onSnapshot快照取得實時更新的資料
    const unSub = onSnapshot(
      q,
      (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No assigned project");
          setEmpty(true);
        } else {
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          // update state
          setEmpty(false);
          setError(null);
          setAssigned(results);
        }
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unSub();
  }, []);

  return { documents, error, assigned, empty };
};

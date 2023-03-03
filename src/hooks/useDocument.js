import { projectFirestore } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useDocument = () => {
  const { docId } = useParams();
  const [document, setDocument] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const ref = doc(projectFirestore, "project", docId);
    //使用onSnapshot快照取得實時更新的資料
    const unSub = onSnapshot(
      ref,
      (doc) => {
        if (docId == "board" || docId == "empty") {
          setError("No Project Selected.");
        } else if (!doc.exists()) {
          console.log("No document");
          setError("Cannot find the project.");
        } else if (
          //查詢專案中的owner或coworker是否有包含自己
          doc.data().owner == user.uid ||
          doc.data().coworkers.some((coworker) => coworker.uid == user.uid)
        ) {
          setDocument({ id: doc.id, ...doc.data() });
          // update state
          setError(null);
        } else {
          //沒有權限查看這個project
          setDocument("");
          setError("Cannot access this project.");
        }
      },
      (error) => {
        console.log(error);
        setError("Internal Error.");
      }
    );

    // unsubscribe on unmount
    return () => unSub();
  }, [docId]);

  return { document, error };
};

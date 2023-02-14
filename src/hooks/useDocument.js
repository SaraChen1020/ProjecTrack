import { projectFirestore } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const useDocument = () => {
  const { docId } = useParams();
  const [document, setDocument] = useState("");
  const [error, setError] = useState(null);
  const [coworker, setCoworker] = useState("");
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const ref = doc(projectFirestore, "project", docId);
    //使用onSnapshot快照取得實時更新的資料
    const unSub = onSnapshot(
      ref,
      (doc) => {
        if (docId == "board" || docId == "empty") {
          setError("No Project Selected");
        } else if (!doc.exists()) {
          console.log("No document");
          setError("Cannot find the project");
        } else {
          setDocument({ id: doc.id, ...doc.data() });
          // update state
          setError(null);
        }

        // if (doc.exists() && doc.data().coworkers.length == 0) {
        //   setEmpty(true);
        // } else {
        //   setEmpty(false);
        //   setCoworker(doc.data().coworkers);
        // }
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unSub();
  }, [docId]);

  return { document, error, coworker, empty };
};

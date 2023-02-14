import { useState, useEffect } from "react";
import { projectFirestore } from "../utils/firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

export const useFetchUsers = () => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const userRef = collection(projectFirestore, "users");
    const unSub = onSnapshot(
      userRef,
      (snapshot) => {
        let userList = [];
        snapshot.forEach((doc) => {
          userList.push(doc.data());
        });
        setUsers(userList);
      },
      (error) => {
        console.log(error);
      }
    );
    // unsubscribe on unmount
    return () => unSub();
  }, []);

  return { users };
};

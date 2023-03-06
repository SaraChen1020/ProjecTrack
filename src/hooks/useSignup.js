import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { projectAuth, projectFirestore } from "../utils/firebase";
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);

    try {
      //先檢查displayName有無重複
      const ref = collection(projectFirestore, "users");
      const q = query(ref, where("displayName", "==", displayName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const response = await createUserWithEmailAndPassword(
          projectAuth,
          email,
          password
        );

        if (!response) {
          throw new Error("Could not complete signup");
        }

        // add display name to user
        await updateProfile(projectAuth.currentUser, {
          displayName,
        });

        // dispatch login action
        dispatch({ type: "LOGIN", payload: response.user });

        // 新增user collection存放會員uid
        const userRef = doc(projectFirestore, "users", response.user.uid);
        await setDoc(userRef, {
          uid: response.user.uid,
          displayName: response.user.displayName,
        });

        setError(null);
        setIsLoading(false);
        navigate("/project");
      } else {
        setError("DisplayName already in use");
        setIsLoading(false);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email.");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;
        default:
      }
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

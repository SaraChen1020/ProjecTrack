import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { projectAuth, projectFirestore } from "../utils/firebase";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete login");
      }
      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      setIsLoading(false);
      setError(null);
      navigate("/project");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email.");
          break;
        case "auth/user-not-found":
          setError("Email not found.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        default:
      }
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError(null);

    try {
      const response = await signInWithPopup(projectAuth, provider);

      if (!response) {
        throw new Error("Could not complete login");
      }

      // dispatch login action
      await dispatch({ type: "LOGIN", payload: response.user });

      // 新增user collection存放會員uid
      const userRef = doc(projectFirestore, "users", response.user.uid);
      await setDoc(userRef, {
        uid: response.user.uid || "",
        displayName: response.user.displayName || "",
      });

      setIsLoading(false);
      setError(null);
      navigate("/project");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email.");
          break;
        case "auth/user-not-found":
          setError("Email not found.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        default:
      }
      setIsLoading(false);
    }
  };

  return { login, googleLogin, isLoading, error };
};

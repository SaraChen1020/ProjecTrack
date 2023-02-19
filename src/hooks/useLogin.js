import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { projectAuth } from "../utils/firebase";
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
          setError("信箱格式錯誤");
          break;
        case "auth/user-not-found":
          setError("信箱不存在");
          break;
        case "auth/wrong-password":
          setError("密碼輸入錯誤");
          break;
        default:
      }
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

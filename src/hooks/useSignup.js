import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { projectAuth } from "../utils/firebase";
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
      dispatch({ type: "LOGIN", information: response.user });

      setError(null);
      setIsLoading(false);
      navigate("/project");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

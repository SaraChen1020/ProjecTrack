import { useState } from "react";
import { projectAuth } from "../utils/firebase";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsLoading(true);

    // sign the user out
    try {
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      setIsLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { logout, error, isLoading };
};

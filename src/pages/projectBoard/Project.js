import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useNavigate } from "react-router-dom";

export default function Project() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("project", user.uid);
  const navigate = useNavigate();

  useEffect(() => {
    if (documents) {
      navigate(`/project/board`);
    }
    if (error) {
      navigate("/project/empty");
    }
  }, [documents, error]);

  return <div>{/*...*/}</div>;
}

import React from "react";
import { useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useNavigate } from "react-router-dom";

export default function Project() {
  const { documents, error, assigned, empty } = useCollection("project");
  const navigate = useNavigate();

  useEffect(() => {
    if (documents || assigned) {
      navigate("/project/board");
    }
    if (error && empty) {
      navigate("/project/empty");
    }
  }, [documents, error, assigned, empty]);

  return <div>{/*...*/}</div>;
}

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { BiLoaderAlt } from "react-icons/bi";
import { TbAlertTriangle } from "react-icons/tb";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Display Name:</span>
        <input
          required
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {!isLoading && <button className="btn">Sign Up</button>}
      {isLoading && (
        <button className="btn" disabled>
          <BiLoaderAlt className="loading" />
        </button>
      )}
      {error && (
        <div className="error">
          <div className="error-icon">
            <TbAlertTriangle />
          </div>
          {error}
        </div>
      )}
      <div className="message">
        Already have account ? <Link to="/login"> Log In</Link>
      </div>
    </form>
  );
}

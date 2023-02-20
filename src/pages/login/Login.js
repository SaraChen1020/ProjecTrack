import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { BiLoaderAlt } from "react-icons/bi";
import { TbAlertTriangle } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
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
      {!isLoading && <button className="btn">Log In</button>}
      {isLoading && (
        <button className="btn" disabled>
          <BiLoaderAlt className="loading" />
        </button>
      )}

      <div
        className="google"
        onClick={() => {
          googleLogin();
        }}
      >
        <div className="google-icon">
          <FcGoogle />
        </div>
        <div>Continue with Google</div>
      </div>

      {error && (
        <div className="error">
          <div className="error-icon">
            <TbAlertTriangle />
          </div>
          {error}
        </div>
      )}
      <div className="message">
        New to this site? <Link to="/signup"> Sign up</Link>
      </div>
    </form>
  );
}

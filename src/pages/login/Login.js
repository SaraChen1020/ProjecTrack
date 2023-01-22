import React from "react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { BiLoaderAlt } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>會員登入</h2>
      <label>
        <span>信箱:</span>
        <input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>密碼:</span>
        <input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      {!isLoading && <button className="btn">登入</button>}
      {isLoading && (
        <button className="btn" disabled>
          <BiLoaderAlt className="loading" />
        </button>
      )}
    </form>
  );
}

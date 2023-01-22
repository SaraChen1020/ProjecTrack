import React from "react";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { BiLoaderAlt } from "react-icons/bi";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>註冊新帳號</h2>
      <label>
        <span>使用者名稱:</span>
        <input
          required
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />
      </label>
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

      {!isLoading && <button className="btn">註冊</button>}
      {isLoading && (
        <button className="btn" disabled>
          <BiLoaderAlt className="loading" />
        </button>
      )}
    </form>
  );
}

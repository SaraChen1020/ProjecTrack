import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { BiLoaderAlt } from "react-icons/bi";
import { TbAlertTriangle } from "react-icons/tb";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
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
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>密碼:</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {!isLoading && <button className="btn">登入</button>}
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
        還沒有帳號? <Link to="/signup">點此註冊</Link>
      </div>
    </form>
  );
}

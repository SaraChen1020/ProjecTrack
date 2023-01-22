import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import "./Navbar.css";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="header">
      <div className="navbar">
        <ul>
          <li className="logo-icon">
            <Link to="/">
              <span className="title">ProjecTrack</span>
            </Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to="/login">
                  <span className="sign-btn">登入</span>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <span className="sign-btn">註冊</span>
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="greeting">Hello, {user.displayName}</li>
              <li>
                <button className="btn" onClick={logout}>
                  登出
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

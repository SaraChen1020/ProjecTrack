import React from "react";
import { Link } from "react-router-dom";

// styles
import "./Home.css";
import Line from "../../images/homepage_background.png";

export default function Home() {
  return (
    <div className="home">
      <div className="main">
        <img src={Line} className="background-pic" alt="line" />
        <div className="section">
          <div className="content">
            <h2>Tracking your project progress.</h2>
            <h3>追蹤並管理您的任務進度</h3>
            <div className="start-btn">
              <Link to="/project">Get Start Now!</Link>
            </div>
          </div>
          <div className="picture">
            <div className="pic"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

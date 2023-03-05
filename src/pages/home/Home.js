import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// styles
import "./Home.css";
import Line from "../../images/homepage_background.png";
import Intro_1 from "../../images/intro-1.jpg";
import DND_gif from "../../images/dnd.gif";
import Intro_2 from "../../images/intro-2.jpg";
import assign_gif from "../../images/assign.gif";
import Intro_3 from "../../images/intro-3.jpg";
import privacy_gif from "../../images/privacy.gif";
import device from "../../images/device.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="main">
        <img src={Line} className="background-pic" alt="line" />
        <div className="section">
          <div className="content">
            <h1>Tracking your project progress.</h1>
            <p>
              ProjecTrack provides you an easy way to manage not only your own
              project but also team project.
            </p>
            <button
              class="start-button"
              role="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Get Start Now !
            </button>
          </div>
          <div className="picture">
            <div className="pic"></div>
          </div>
        </div>
      </div>
      <div className="introduction">
        <div className="intro">
          <div className="intro-section">
            <div className="intro-content">
              <img src={Intro_1} alt="intro-1-pic" />
              <h2>Drag and drop your tasks.</h2>
              <p>Easy to classify and master the project progress.</p>
            </div>
            <div className="intro-pic-area">
              <img src={DND_gif} alt="dnd-gif" />
            </div>
          </div>
        </div>
        <div className="intro">
          <div className="intro-section">
            <div className="intro-content">
              <img src={Intro_2} alt="intro-2-pic" />
              <h2>Assign project to others.</h2>
              <p>Let the team manage the project together.</p>
            </div>
            <div className="intro-pic-area">
              <img src={assign_gif} alt="assign-gif" />
            </div>
          </div>
        </div>
        <div className="intro">
          <div className="intro-section">
            <div className="intro-content">
              <img src={Intro_3} alt="intro-3-pic" />
              <h2>Protect your project privacy.</h2>
              <p>Non-team members can't view project through the link.</p>
            </div>
            <div className="intro-pic-area">
              <img src={privacy_gif} alt="assign-gif" />
            </div>
          </div>
        </div>
        <div className="intro">
          <div className="intro-section intro-section-4">
            <div className="intro-content">
              <h2>Easy to browse in various devices.</h2>
              <p>With any device, you can easily browse content anytime.</p>
              <div className="btn">
                <Link to="/login">Start Now !</Link>
              </div>
            </div>
            <div className="intro-pic-area">
              <img src={device} alt="devices" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

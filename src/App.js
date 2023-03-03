import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./App.css";

// pages and components
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Project from "./pages/projectBoard/Project";
import ProjectBoard from "./pages/projectBoard/ProjectBoard";
import CardInformation from "./pages/projectBoard/components/CardInformation";
import Footer from "./components/footer";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={!user ? <Home /> : <Navigate to="/project" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/project" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/project"
              element={user ? <Project /> : <Navigate to="/login" />}
            />
            <Route
              path="/project/:docId"
              element={user ? <ProjectBoard /> : <Navigate to="/login" />}
            />
            <Route
              path="/project/:id/:cardId"
              element={user ? <CardInformation /> : <Navigate to="/login" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

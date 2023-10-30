import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/leaderboard" Component={Leaderboard} />
          <Route path="/about" Component={About} />
          <Route path="/login" Component={Login}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

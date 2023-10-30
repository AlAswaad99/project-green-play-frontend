import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import "./App.css";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" exact Component={Home} />
            <Route path="/leaderboard" Component={Leaderboard} />
            <Route path="/about" Component={About} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

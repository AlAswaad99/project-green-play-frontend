import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import About from "./pages/About";
import CampaignDetails from "./pages/CampaignDetails";
import Campaign from "./pages/Campaigns";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
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
            <Route path="/campaign" exact Component={Campaign} />
            <Route path="/campaign/:id" exact Component={CampaignDetails} />
            <Route path="/leaderboard" Component={Leaderboard} />
            <Route path="/about" Component={About} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

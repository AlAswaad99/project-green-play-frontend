import React from "react";
import { Button } from "./Button";
import "./Hero.css";
import "../App.css";
import { useUserSessionStore } from "../provider/user";

function Hero() {
  const { userSession, setUserSession } = useUserSessionStore();

  return (
    <div className="hero-container">
      <h1>PROJECT GREEN PLAY</h1>
      <p>Gamifying Green</p>
      <div className="hero-btns">
        {!userSession && <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          route={"/register"}
        >
          SIGN UP
        </Button>}
      </div>
    </div>
  );
}

export default Hero;

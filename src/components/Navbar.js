import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { userPool } from '../aws-config';

import "./Navbar.css";
import { useUserSessionStore } from "../provider/user";

function Navbar() {
  const { userSession, setUserSession } = useUserSessionStore();

  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [loggedOut, setloggedOut] = useState(false);
  const [button, setButton] = useState(true);
  // const [user, setuser] = useState();
  // const userJSON = localStorage.getItem('user');
  // console.log(userJSON)

  // const user = userJSON !== undefined ? JSON.parse(userJSON) : null;
  // console.log('zuser', user)
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logout = async () => {
    console.log("logging out")
    setClick(false);

    const currentUser = userPool.getCurrentUser();
    console.log(currentUser)
    if (currentUser) {
      currentUser.signOut();
      localStorage.removeItem("session");
      setUserSession();
      setloggedOut(true);
      navigate('/');
      // getUserSession();
      console.log('User signed out successfully');
    } else {
      console.warn('No user is currently signed in');
    }


  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const getUserSession = () => {
    if (userSession) return;
    const localStorageSession = localStorage.getItem('session');

    if (localStorageSession) {
      // const user = JSON.parse(localStorageSession);
      setUserSession(JSON.parse(localStorageSession));
      return;
    }
    navigate("/login")
  }

  // useLayoutEffect(() => {
  //   // const currentUser = userPool.getCurrentUser();
  //   // if (currentUser) {
  //   //   currentUser.getSession()
  //   //   currentUser.signOut();
  //   //   localStorage.removeItem("session");
  //   //   setUserSession();
  //   //   setloggedOut(true);
  //   //   navigate('/');
  //   //   // getUserSession();
  //   //   console.log('User signed out successfully');
  //   // } else {
  //   //   console.warn('No user is currently signed in');
  //   // }
  // }, [userSession, loggedOut]);

  useLayoutEffect(() => {
    if (!loggedOut) {
      showButton();
      getUserSession();
    }
  }, [userSession, loggedOut]);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PGP
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className={`nav-item ${userSession ? "mt-3" : ""}`}>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>


            <li className={`nav-item ${userSession ? "mt-3" : ""}`}>
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className={`nav-item ${userSession ? "mt-3" : ""}`}>
              <Link
                to="/leaderboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Leaderboard
              </Link>
            </li>
            {userSession && <li className={`nav-item ${userSession ? "mt-3" : ""}`}>
              <Link
                to="/campaign"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Campaigns
              </Link>
            </li>}

            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                {userSession ? userSession.idToken.payload.name : "Sign In"}
              </Link>
            </li>
          </ul>
          {button && (!userSession ? <Button buttonStyle="btn--outline">
            Sign In
          </Button> :
            <Link
              to="/#"
              className="nav-links dropdown-trigger cursor-default relative inline-block"
              // onClick={logout}
            >
              {userSession.idToken.payload.name}
              <Dropdown logout={logout}/>
            </Link>)}
        </div>
      </nav>
    </>
  );
}

const Dropdown = ({logout}) => {
  return (
    <div className="dropdown-content">
      <ul>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;

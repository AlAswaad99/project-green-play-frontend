import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  // const [user, setuser] = useState();
  const userJSON = localStorage.getItem('user');

  const user = JSON.parse(userJSON);
  // console.log('zuser', user)
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logout = () => {
    setClick(false);
    localStorage.removeItem("user");
    navigate('/login');

  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useLayoutEffect(() => {
    showButton();
  }, []);

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
            <li className={`nav-item ${user ? "mt-3" : ""}`}>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>


            <li className={`nav-item ${user ? "mt-3" : ""}`}>
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className={`nav-item ${user ? "mt-3" : ""}`}>
              <Link
                to="/leaderboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Leaderboard
              </Link>
            </li>
            {user && <li className={`nav-item ${user ? "mt-3" : ""}`}>
              <Link
                to="/campaign"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Campaign
              </Link>
            </li>}

            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                {user ? user.username : "Sign In"}
              </Link>
            </li>
          </ul>
          {button && (!user ? <Button buttonStyle="btn--outline">
            Sign In
          </Button> :
            <Link
              to="/#"
              className="nav-links cursor-default"
              onClick={logout}
            >
              {user.username}
            </Link>)}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

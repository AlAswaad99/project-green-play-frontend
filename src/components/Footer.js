import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll animation
    });
  };
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-logo">
          <div className="footer-logo-image">
            <img
              src={require("../assets/images/img-logo.png")}
              alt="Company Logo"
            />
          </div>
          <div className="footer-logo-text">
            <Link to="/" className="logo-text">
              PROJECT
              <br />
              GREEN
              <br />
              PLAY
            </Link>
          </div>
        </div>
        <div className="footer-link-items">
          <h2>Contact Us</h2>
          <a href="/#">Addis Ababa, Ethiopia</a>
          <a href="/#">+251-90-111-2222</a>
          <a href="/#">info@greenplay.org</a>
        </div>
        <div className="footer-link-items">
          <h2>Quick Links</h2>
          <Link to="/register">Sign Up</Link>
          <Link to="/about" onClick={scrollToTop}>About</Link>
        </div>
      </div>
      <section className="copyright">
        <small className="website-rights">
          Project Green Play &copy; {new Date().getFullYear()}
        </small>
      </section>
    </div>
  );
}

export default Footer;

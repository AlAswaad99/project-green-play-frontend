import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div class="footer-links">
        <div className="footer-logo">
          <Link to="/" className="logo">
            <img
              src={require("../assets/images/img-logo.png")}
              alt="Company Logo"
            />
          </Link>
        </div>
        <div class="footer-link-items">
          <h2>Contact Us</h2>
          <a href="https://www.google.com/maps">Addis Ababa, Ethiopia</a>
          <a href="tel:+251-90-111-2222">+251-90-111-2222</a>
          <a href="mailto:info@greenplay.org">info@greenplay.org</a>
        </div>
        <div class="footer-link-items">
          <h2>Quick Links</h2>
          <Link to="/register">Sign Up</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <section class="copyright">
        <small class="website-rights">Project Green Play © 2023</small>
      </section>
    </div>
  );
}

export default Footer;

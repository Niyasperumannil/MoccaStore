import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Download Section */}
        <div className="footer-column">
          <h3 className="footer-title">DOWNLOAD THE APP</h3>
          <div className="app-buttons">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="app-badge"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="app-badge"
              />
            </a>
          </div>
        </div>

        {/* Shop Section */}
        <div className="footer-column">
          <h3 className="footer-title">SHOP</h3>
          <ul className="footer-links">
            <li>WOMAN</li>
            <li>MAN</li>
            <li>KIDS</li>
            <li>HOME</li>
          </ul>
        </div>

        {/* Sites & Stores Section */}
        <div className="footer-column">
          <h3 className="footer-title">SITES & STORES</h3>
          <ul className="footer-links">
            <li>ABOUT US</li>
            <li>CONTACT US</li>
            <li>STORE LOCATOR</li>
            <li>MEDIA CENTER</li>
            <li>SITEMAP</li>
            <li>MEMBERSHIP</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-policies">
          <span>TERMS & CONDITIONS</span>
          <span>PRIVACY POLICY</span>
          <span>RETURN POLICY</span>
          <span>COOKIE POLICY</span>
          <span>GST BENEFITS</span>
        </div>

        <div className="footer-icons">
          <i className="fa fa-twitter"></i>
          <i className="fa fa-facebook"></i>
          <i className="fa fa-instagram"></i>
          <i className="fa fa-youtube"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

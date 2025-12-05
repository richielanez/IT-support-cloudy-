import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="footer-row">
          <span>© {year} Cloudy IT Support. All rights reserved.</span>
          <span>
            Demo dark-mode site – connect forms &amp; dashboard to your own backend when ready.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

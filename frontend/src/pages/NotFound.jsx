import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section>
      <div className="container">
        <h2 className="section-title">404 – Page not found</h2>
        <p className="section-subtitle">
          The page you’re looking for doesn’t exist. It may have been moved or renamed.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          ⬅ Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

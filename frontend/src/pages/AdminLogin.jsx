import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("cloudy_admin_token", res.data.token);
      localStorage.setItem("cloudy_admin_email", res.data.email);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admin-login">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 className="section-title">🔐 Admin Login</h2>
            <p className="section-subtitle">
              Sign in to view and manage tickets. Use the credentials configured in the backend
              environment variables.
            </p>
          </div>
        </div>

        <div className="contact-layout">
          <div className="form-card">
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@cloudyit.org"
                />
              </div>
              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Your password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              {error && <p className="error-text">{error}</p>}
            </form>
          </div>
          <div className="contact-info-card">
            <p className="contact-note">
              The first admin user is created automatically on backend startup using the
              <code> ADMIN_EMAIL </code> and <code> ADMIN_PASSWORD </code> environment variables.
            </p>
            <p className="contact-note">
              Once logged in, you can view all tickets, filter by status, and update each ticket from
              Open → Pending → Closed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;

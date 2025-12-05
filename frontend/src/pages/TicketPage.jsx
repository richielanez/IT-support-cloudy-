import React, { useState } from "react";
import api from "../services/api.js";

const initialForm = {
  name: "",
  email: "",
  device: "",
  priority: "",
  subject: "",
  description: ""
};

const TicketPage = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await api.post("/tickets", {
        ...form
      });
      setMessage(
        `Ticket submitted successfully! Your ticket ID is ${res.data._id}. Check your email for confirmation.`
      );
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while submitting your ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ticket">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 className="section-title">🎫 Support Ticket</h2>
            <p className="section-subtitle">
              Use this form to log a detailed issue so it can be tracked and updated like a professional
              helpdesk.
            </p>
          </div>
        </div>

        <div className="ticket-layout">
          <div className="form-card">
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="ticket-name">Name</label>
                  <input
                    id="ticket-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group half">
                  <label htmlFor="ticket-email">Email</label>
                  <input
                    id="ticket-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="ticket-device">Device type</label>
                  <select
                    id="ticket-device"
                    name="device"
                    required
                    value={form.device}
                    onChange={handleChange}
                  >
                    <option value="">Select device</option>
                    <option>Desktop PC</option>
                    <option>Laptop</option>
                    <option>Server / NAS</option>
                    <option>Router / Wi-Fi</option>
                    <option>Printer / Peripheral</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group half">
                  <label htmlFor="ticket-priority">Priority</label>
                  <select
                    id="ticket-priority"
                    name="priority"
                    required
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low – Minor issue</option>
                    <option value="Medium">Medium – Blocking work</option>
                    <option value="High">High – Urgent / system down</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ticket-subject">Short summary</label>
                <input
                  id="ticket-subject"
                  name="subject"
                  type="text"
                  placeholder="Example: Laptop freezes after login"
                  required
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ticket-description">Full description</label>
                <textarea
                  id="ticket-description"
                  name="description"
                  placeholder="What happens? When did it start? Any error messages? What have you tried so far?"
                  required
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center", marginTop: "0.3rem" }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "🚀 Submit Ticket"}
              </button>
              <div className="small-hint">
                Once submitted, you’ll receive a confirmation email. Admin will update the status as it
                progresses.
              </div>

              {message && <p className="success-text">{message}</p>}
              {error && <p className="error-text">{error}</p>}
            </form>
          </div>

          <aside className="ticket-side">
            <div className="ticket-pill">
              <span>ℹ️ Tip</span>
              <span>One issue per ticket gives the fastest resolution.</span>
            </div>
            <p>
              This ticket form is connected to a live backend API. Each submission creates a ticket in
              the database and triggers email notifications.
            </p>
            <p>Behind the scenes, the flow looks like this:</p>
            <ul style={{ paddingLeft: "1.1rem" }}>
              <li>Ticket is stored in MongoDB</li>
              <li>Admin is notified by email</li>
              <li>You receive a confirmation email</li>
              <li>Admin updates status from “Open” to “Pending” or “Closed”</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default TicketPage;

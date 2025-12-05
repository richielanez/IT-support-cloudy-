import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import StatusBadge from "../components/StatusBadge.jsx";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const adminEmail = localStorage.getItem("cloudy_admin_email");

  const fetchTickets = async (status) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("cloudy_admin_token");
      const params = {};
      if (status) params.status = status;
      const res = await api.get("/tickets", {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Fetch tickets error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(statusFilter);
  }, [statusFilter]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("cloudy_admin_token");
      const res = await api.patch(
        `/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Status update error", err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("cloudy_admin_token");
    localStorage.removeItem("cloudy_admin_email");
    window.location.href = "/admin/login";
  };

  return (
    <section id="admin">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 className="section-title">🔐 Admin Dashboard</h2>
            <p className="section-subtitle">
              View all tickets, filter by status, and update each ticket as it progresses from Open →
              Pending → Closed.
            </p>
          </div>
          <div className="admin-top-meta">
            <span className="admin-user">Signed in as: {adminEmail}</span>
            <button className="btn btn-secondary" onClick={logout}>
              Log out
            </button>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-title">Ticket Overview</div>
              <div className="admin-tag">Live data</div>
            </div>

            <div className="admin-filters">
              <label>
                Filter by status:
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Open">Open</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </label>
            </div>

            {loading ? (
              <p>Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p>No tickets found.</p>
            ) : (
              <table className="tickets-table" aria-label="Tickets">
                <thead>
                  <tr>
                    <th>Created</th>
                    <th>Subject</th>
                    <th>Customer</th>
                    <th>Device</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t._id}>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
                      <td>{t.subject}</td>
                      <td>
                        {t.name}
                        <br />
                        <span className="tickets-email">{t.email}</span>
                      </td>
                      <td>{t.device}</td>
                      <td>
                        <span
                          className={`priority-pill priority-${
                            t.priority.toLowerCase() || "low"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={t.status} />
                      </td>
                      <td>
                        <select
                          value={t.status}
                          disabled={updatingId === t._id}
                          onChange={(e) => updateStatus(t._id, e.target.value)}
                        >
                          <option value="Open">Open</option>
                          <option value="Pending">Pending</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <aside className="admin-card admin-activity">
            <div className="admin-card-header">
              <div className="admin-card-title">How this dashboard works</div>
              <div className="admin-tag">Status flow</div>
            </div>

            <div className="activity-item">
              <div className="activity-bullet">🆕</div>
              <div className="activity-body">
                <div className="activity-title">Open</div>
                <div className="activity-meta">
                  New tickets start as <strong>Open</strong>. Review and triage them here.
                </div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-bullet">⏳</div>
              <div className="activity-body">
                <div className="activity-title">Pending</div>
                <div className="activity-meta">
                  Use <strong>Pending</strong> when you&apos;re waiting for the customer or external
                  action.
                </div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-bullet">✅</div>
              <div className="activity-body">
                <div className="activity-title">Closed</div>
                <div className="activity-meta">
                  Once resolved and confirmed, mark the ticket <strong>Closed</strong>.
                </div>
              </div>
            </div>

            <p className="admin-note">
              You can extend this panel with search, sorting, more fields, or even multi-agent
              assignments as Cloudy IT Support grows.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;

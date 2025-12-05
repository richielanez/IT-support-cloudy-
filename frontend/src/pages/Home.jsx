import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section id="home">
        <div className="container">
          <div className="hero">
            <div>
              <div className="badge">
                <span className="badge-dot" />
                <span>Same-day remote support · Home &amp; small business</span>
              </div>
              <h1 className="hero-title">
                Fast &amp; Reliable <span className="accent">IT Support</span>
                <br />
                for Home &amp; Business.
              </h1>
              <p className="hero-subtitle">
                Cloudy IT Support keeps your computers, laptops, and networks healthy – with friendly,
                on-demand help you can trust.
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  📩 Book Support
                </a>
                <Link to="/ticket" className="btn btn-secondary">
                  🎫 Open a Support Ticket
                </Link>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-item">
                  ⚡ <span>Remote fixes &amp; on-site visits (where available)</span>
                </div>
                <div className="hero-meta-item">
                  🔒 <span>Secure, privacy-focused troubleshooting</span>
                </div>
                <div className="hero-meta-item">
                  💬 <span>WhatsApp &amp; email updates on every case</span>
                </div>
              </div>
            </div>

            <aside className="hero-right" aria-label="At-a-glance support status">
              <div className="hero-card">
                <div className="hero-card-header">
                  <div>
                    <div className="hero-card-title">Cloudy Support Console</div>
                    <div className="hero-card-sub">
                      Live snapshot of your service desk
                    </div>
                  </div>
                  <div className="hero-card-pill">Demo view</div>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat-card">
                    <div className="hero-stat-label">Open tickets</div>
                    <div className="hero-stat-value">5</div>
                    <div className="hero-stat-tagline">Avg. response &lt; 30 min</div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="hero-stat-label">Today’s resolutions</div>
                    <div className="hero-stat-value">12</div>
                    <div className="hero-stat-tagline">Remote &amp; on-site</div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="hero-stat-label">Systems monitored</div>
                    <div className="hero-stat-value">27</div>
                    <div className="hero-stat-tagline">PCs, laptops &amp; NAS</div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="hero-stat-label">Satisfaction</div>
                    <div className="hero-stat-value">4.9★</div>
                    <div className="hero-stat-tagline">Client feedback</div>
                  </div>
                </div>

                <div className="hero-queue">
                  <div className="queue-header">
                    <span className="queue-dot" />
                    <span>Live ticket queue</span>
                  </div>
                  <div className="queue-item">
                    <span>
                      <strong>#432</strong> Laptop won’t boot
                    </span>
                    <span>In progress · 🔴 High</span>
                  </div>
                  <div className="queue-item">
                    <span>
                      <strong>#431</strong> Wi-Fi keeps dropping
                    </span>
                    <span>Investigating · 🟡 Medium</span>
                  </div>
                  <div className="queue-item">
                    <span>
                      <strong>#430</strong> New PC setup
                    </span>
                    <span>Scheduled · 🟢 Low</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 className="section-title">💼 Services</h2>
              <p className="section-subtitle">
                Whether it’s a slow family PC or a critical business laptop, Cloudy IT Support provides
                clear, no-nonsense help.
              </p>
            </div>
            <div className="section-subtitle">
              Need something custom? Mention it in your ticket or contact message and we’ll tailor a solution.
            </div>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon">🌐</div>
              <h3 className="service-title">Remote IT Support</h3>
              <p className="service-description">
                Secure remote sessions to quickly diagnose and fix problems without waiting for a visit.
                Ideal for urgent issues and small tweaks.
              </p>
              <div className="service-meta">
                <span className="service-tag">Same-day available</span>
                <span>Home &amp; business</span>
              </div>
            </article>

            <article className="service-card">
              <div className="service-icon">🖥️</div>
              <h3 className="service-title">PC Troubleshooting</h3>
              <p className="service-description">
                Blue screens, slow performance, strange pop-ups, software crashes – we track down the
                cause and get your machine back in shape.
              </p>
              <div className="service-meta">
                <span className="service-tag">Windows &amp; more</span>
                <span>Diagnostics included</span>
              </div>
            </article>

            <article className="service-card">
              <div className="service-icon">💻</div>
              <h3 className="service-title">Laptop Repairs</h3>
              <p className="service-description">
                Help with hardware and software issues, from overheating and noisy fans to failing
                drives and battery problems.
              </p>
              <div className="service-meta">
                <span className="service-tag">Hardware &amp; OS</span>
                <span>Pickup by arrangement</span>
              </div>
            </article>

            <article className="service-card">
              <div className="service-icon">🗄️</div>
              <h3 className="service-title">Data Backup</h3>
              <p className="service-description">
                Set up automatic backups so your photos, documents, and business files stay safe –
                locally or in the cloud.
              </p>
              <div className="service-meta">
                <span className="service-tag">Disaster-ready</span>
                <span>Encrypted options</span>
              </div>
            </article>

            <article className="service-card">
              <div className="service-icon">📶</div>
              <h3 className="service-title">Network Setup</h3>
              <p className="service-description">
                Wi-Fi that actually works everywhere you need it. Router setup, mesh networks,
                printers, NAS, and smart devices.
              </p>
              <div className="service-meta">
                <span className="service-tag">On-site &amp; remote</span>
                <span>Home &amp; office</span>
              </div>
            </article>

            <article className="service-card">
              <div className="service-icon">🧠</div>
              <h3 className="service-title">IT Consultation</h3>
              <p className="service-description">
                Planning upgrades, new equipment, or a small business setup? Get clear advice on what
                to buy and how to configure it.
              </p>
              <div className="service-meta">
                <span className="service-tag">Vendor neutral</span>
                <span>Budget-friendly</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 className="section-title">👤 About Cloudy IT Support</h2>
              <p className="section-subtitle">
                A personal, friendly IT partner for your everyday tech – not a faceless call centre.
              </p>
            </div>
          </div>

          <div className="about-layout">
            <div className="about-text">
              <p>
                Cloudy IT Support is a personal IT helpdesk focused on real people and small businesses.
                Instead of confusing jargon and long waiting times, you get clear explanations, quick
                responses, and practical solutions that actually fix the problem.
              </p>
              <p>
                From first contact to final resolution, you deal with the same technician – someone who
                knows your setup, your devices, and how you like to work.
              </p>

              <div className="about-highlights">
                <div className="about-pill">✅ Plain-language explanations</div>
                <div className="about-pill">🛡️ Privacy-first troubleshooting</div>
                <div className="about-pill">📅 Flexible appointment times</div>
                <div className="about-pill">🏠 Home &amp; small office focused</div>
              </div>
            </div>

            <aside>
              <div className="about-card">
                <div className="about-card-header">
                  <div>
                    <div className="about-card-title">Why Cloudy?</div>
                    <div className="about-card-sub">
                      Think of it as your “IT person” on speed dial.
                    </div>
                  </div>
                  <div className="about-card-status">
                    <span className="chat-status-dot" /> Accepting new clients
                  </div>
                </div>
                <p>
                  Most people don’t need a full-time IT department – just quick, trusted help when
                  something breaks, slows down, or needs to be set up correctly the first time.
                </p>
                <p>
                  That’s exactly what Cloudy IT Support offers: personal service, predictable
                  communication, and simple pricing. No contracts are required for one-off jobs, and
                  ongoing support plans can be arranged for businesses that want continuous care.
                </p>
                <p>
                  Open a ticket, send a WhatsApp message, or request a call – and your issue goes
                  straight into the queue shown on this site’s dashboard.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CONTACT SNIPPET */}
      <section id="contact">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 className="section-title">📞 Contact</h2>
              <p className="section-subtitle">
                Reach out with any question – from “my PC feels slow” to “how do I secure my office network?”.
              </p>
            </div>
          </div>

          <div className="contact-layout">
            <div className="form-card">
              <p style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
                Prefer direct contact? Send an email or WhatsApp and include a brief description of
                your issue. You can also use the ticket form for full tracking.
              </p>
              <Link
                to="/ticket"
                className="btn btn-primary"
                style={{ marginTop: "0.8rem", justifyContent: "center", width: "100%" }}
              >
                🎫 Open a Support Ticket
              </Link>
            </div>

            <aside className="contact-info-card">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href="mailto:tech@cloudyit.org">tech@cloudyit.org</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <div className="contact-value">
                    <a href="tel:0687596021">0687596021</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏱️</div>
                <div>
                  <div className="contact-label">Typical response time</div>
                  <div className="contact-value">Under 1 business day</div>
                </div>
              </div>

              <p className="contact-note">
                Prefer WhatsApp? Send a quick voice note or text with your issue – include photos or
                screenshots if you can. You’ll receive clear next steps and a proposed plan (remote or
                on-site where possible).
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

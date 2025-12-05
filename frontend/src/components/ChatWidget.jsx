import React, { useState } from "react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: "Hi! This is the Cloudy IT Support demo chat. Type your question and I’ll show how a quick auto-reply could work."
    }
  ]);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "agent",
          text:
            "Thanks for your message! This is a demo chat, so no one is really connected – please email tech@cloudyit.org or send a WhatsApp to 0687596021 for real support."
        }
      ]);
    }, 700);
  };

  return (
    <div className="chat-widget" aria-live="polite">
      <button
        className="chat-toggle"
        onClick={() => setOpen(true)}
        aria-label="Open live chat"
      >
        💬
      </button>

      <div
        className={`chat-window ${open ? "open" : ""}`}
        aria-label="Live chat widget"
      >
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">☁️</div>
            <div>
              <div style={{ fontSize: "0.8rem" }}>Cloudy IT Support</div>
              <div className="chat-header-status">
                <span className="chat-status-dot" /> Online (demo)
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="chat-close-btn"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div className="chat-body">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`chat-message ${m.from === "agent" ? "agent" : "user"}`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <form className="chat-input-row" onSubmit={send}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chat-send-btn">
            <span>Send</span> ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../hooks/useChat";

function Avatar({ username }) {
  const initials = username?.slice(0, 2).toUpperCase() || "?";
  const colors = ["#7c6aff", "#23d18b", "#ff9f43", "#ff6b9d", "#54a0ff"];
  const color = colors[username?.charCodeAt(0) % colors.length] || "#7c6aff";
  return (
    <div className="avatar" style={{ background: color + "33", color }}>
      {initials}
    </div>
  );
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageArea({ room }) {
  const { user } = useAuth();
  const { messages, typingUsers, loading, send, handleTyping } = useChat(room._id);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput("");
    await send(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="chat-header">
        <span style={{ fontSize: "1.1rem" }}>#</span>
        <h3>{room.name}</h3>
        {room.description && <span className="desc">{room.description}</span>}
      </div>

      <div className="messages-wrap">
        {loading && (
          <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.85rem" }}>
            Loading messages...
          </p>
        )}

        {messages.map((msg) =>
          msg.type === "system" ? (
            <div key={msg._id} className="message-system">
              {msg.content}
            </div>
          ) : (
            <div key={msg._id} className="message">
              <Avatar username={msg.sender?.username} />
              <div className="message-body">
                <div className="message-meta">
                  <strong style={{ color: msg.sender?._id === user._id ? "var(--primary)" : "var(--text)" }}>
                    {msg.sender?.username}
                  </strong>
                  <time>{formatTime(msg.createdAt)}</time>
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Typing indicator */}
      <div className="typing-indicator">
        {typingUsers.length > 0 && (
          <span>
            <span className="typing-dots">
              <span /><span /><span />
            </span>{" "}
            <em>
              {typingUsers.map((u) => u.username).join(", ")}{" "}
              {typingUsers.length === 1 ? "is" : "are"} typing...
            </em>
          </span>
        )}
      </div>

      <div className="input-area">
        <div className="input-wrap">
          <input
            type="text"
            placeholder={`Message #${room.name}`}
            value={input}
            onChange={(e) => { setInput(e.target.value); handleTyping(); }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="send-btn" onClick={handleSend} disabled={!input.trim()}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
}

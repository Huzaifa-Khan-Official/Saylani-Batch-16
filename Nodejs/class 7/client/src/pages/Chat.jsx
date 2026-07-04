import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import MessageArea from "../components/MessageArea";
import CreateRoomModal from "../components/CreateRoomModal";

const API = import.meta.env.VITE_API_URL;

export default function Chat() {
  const { user, logout } = useAuth();
  const { isConnected, on, off } = useSocket();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    axios.get(`${API}/rooms`).then((res) => setRooms(res.data));
  }, []);

  // Listen for new rooms created by anyone
  useEffect(() => {
    const handler = (room) => setRooms((prev) => [room, ...prev]);
    on("room:created", handler);
    return () => off("room:created", handler);
  }, []);

  const handleRoomCreated = (room) => {
    setRooms((prev) => [room, ...prev]);
    setActiveRoom(room);
    setShowCreateModal(false);
  };

  const initials = user?.username?.slice(0, 2).toUpperCase() || "??";

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>
            <span className={`connection-dot ${isConnected ? "" : "offline"}`} />
            SocketChat
          </h2>
        </div>

        <div className="sidebar-section">
          <span>Rooms</span>
          <button onClick={() => setShowCreateModal(true)} title="Create room">＋</button>
        </div>

        <div className="room-list">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`room-item ${activeRoom?._id === room._id ? "active" : ""}`}
              onClick={() => setActiveRoom(room)}
            >
              <span className="room-item-hash">#</span>
              <span>{room.name}</span>
            </div>
          ))}
          {rooms.length === 0 && (
            <p style={{ padding: "0.8rem 0.7rem", fontSize: "0.82rem", color: "var(--muted)" }}>
              No rooms yet. Create one!
            </p>
          )}
        </div>

        <div className="user-bar">
          <div className="avatar">{initials}</div>
          <div className="user-info">
            <strong>{user?.username}</strong>
            <span>● Online</span>
          </div>
          <button className="logout-btn" onClick={logout} title="Sign out">↪</button>
        </div>
      </aside>

      {/* Chat area */}
      <main className="chat-area">
        {activeRoom ? (
          <MessageArea room={activeRoom} />
        ) : (
          <div className="empty-state">
            <div className="icon">💬</div>
            <h3>Select a room to start chatting</h3>
            <p>Pick a room from the sidebar or create a new one.</p>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              Create a Room
            </button>
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleRoomCreated}
        />
      )}
    </div>
  );
}

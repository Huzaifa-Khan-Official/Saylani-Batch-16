import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function CreateRoomModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/rooms`, form);
      onCreated(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>Create a Room</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room Name</label>
            <input
              type="text" placeholder="general, random, dev-talk..."
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              required autoFocus
            />
          </div>
          <div className="form-group">
            <label>Description (optional)</label>
            <input
              type="text" placeholder="What's this room about?"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          {error && <p className="error-msg">⚠ {error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

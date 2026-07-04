import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>⚡ SocketChat</h1>
        <p className="subtitle">Create your account to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="cooluser123" value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })} required minLength={2} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="min 6 characters" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          {error && <p className="error-msg">⚠ {error}</p>}
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: "0.8rem" }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

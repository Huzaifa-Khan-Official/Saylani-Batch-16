import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div className="status-page">
      <div className="status-icon">❌</div>
      <h1 style={{ color: "var(--danger)" }}>Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges were made. You can try again whenever you're ready.</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>Back to Shop</button>
    </div>
  );
}

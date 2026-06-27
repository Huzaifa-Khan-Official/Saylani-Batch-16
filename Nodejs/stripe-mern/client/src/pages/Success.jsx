import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/payments/verify-session/${sessionId}`)
        .then((res) => setSession(res.data))
        .catch(() => {});
    }
  }, [sessionId]);

  const email = session?.customerEmail || state?.email || "your inbox";
  const orderId = session?.order?._id || state?.orderId;

  return (
    <div className="status-page">
      <div className="status-icon">✅</div>
      <h1 style={{ color: "var(--success)" }}>Payment Successful!</h1>
      <p>
        Thank you for your purchase. A receipt has been sent to <strong>{email}</strong>.
      </p>
      {orderId && (
        <p style={{ fontFamily: "monospace", fontSize: "0.85rem", background: "#f0f2ff", padding: "0.4rem 0.8rem", borderRadius: "6px" }}>
          Order ID: {orderId}
        </p>
      )}
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Continue Shopping</button>
        <button className="btn btn-outline" onClick={() => navigate("/orders")}>View Orders</button>
      </div>
    </div>
  );
}

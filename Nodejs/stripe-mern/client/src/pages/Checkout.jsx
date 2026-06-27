import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CardPaymentForm from "../components/CardPaymentForm";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];
  const [tab, setTab] = useState("card");
  const [hostedForm, setHostedForm] = useState({ name: "", email: "" });
  const [hostedLoading, setHostedLoading] = useState(false);
  const [hostedError, setHostedError] = useState(null);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!cart.length) {
    return (
      <div className="status-page">
        <div className="status-icon">🛒</div>
        <h1>No items to checkout</h1>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Back to Shop</button>
      </div>
    );
  }

  const handleHostedCheckout = async (e) => {
    e.preventDefault();
    setHostedLoading(true);
    setHostedError(null);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-checkout-session`,
        { items: cart, customerEmail: hostedForm.email, customerName: hostedForm.name }
      );
      window.location.href = data.url;
    } catch (err) {
      setHostedError(err.response?.data?.error || "Something went wrong.");
      setHostedLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 280px", gap: "2rem", alignItems: "start" }}>
      {/* Payment form */}
      <div className="card">
        <h2 style={{ marginBottom: "1.5rem" }}>Payment</h2>

        <div className="tabs">
          <button className={`tab-btn ${tab === "card" ? "active" : ""}`} onClick={() => setTab("card")}>
            💳 Custom Form
          </button>
          <button className={`tab-btn ${tab === "hosted" ? "active" : ""}`} onClick={() => setTab("hosted")}>
            🔗 Stripe Hosted
          </button>
        </div>

        {tab === "card" ? (
          <CardPaymentForm
            cart={cart}
            onSuccess={({ orderId, email }) =>
              navigate("/success", { state: { orderId, email, method: "card" } })
            }
          />
        ) : (
          <form onSubmit={handleHostedCheckout}>
            <p style={{ fontSize: "0.88rem", color: "#697386", marginBottom: "1.2rem" }}>
              You'll be redirected to Stripe's secure hosted checkout page.
            </p>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={hostedForm.name} onChange={(e) => setHostedForm({ ...hostedForm, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" value={hostedForm.email} onChange={(e) => setHostedForm({ ...hostedForm, email: e.target.value })} required />
            </div>
            {hostedError && <p className="error-msg">⚠ {hostedError}</p>}
            <button type="submit" className="btn btn-primary" disabled={hostedLoading} style={{ width: "100%", marginTop: "1rem", padding: "0.8rem" }}>
              {hostedLoading ? <span className="spinner" /> : `Pay $${(total / 100).toFixed(2)} via Stripe →`}
            </button>
          </form>
        )}
      </div>

      {/* Order summary */}
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>
        <div className="cart-summary">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span style={{ fontSize: "0.88rem" }}>{item.name} × {item.quantity}</span>
              <strong style={{ fontSize: "0.88rem" }}>${((item.price * item.quantity) / 100).toFixed(2)}</strong>
            </div>
          ))}
          <div className="cart-total">
            <span>Total</span>
            <span style={{ color: "var(--primary)" }}>${(total / 100).toFixed(2)}</span>
          </div>
        </div>
        <button className="btn btn-outline" style={{ width: "100%", marginTop: "1rem" }} onClick={() => navigate("/")}>
          ← Edit Cart
        </button>
      </div>
    </div>
  );
}

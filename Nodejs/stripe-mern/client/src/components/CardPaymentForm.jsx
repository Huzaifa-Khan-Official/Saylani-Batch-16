import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a1f36",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#f44336" },
  },
};

export default function CardPaymentForm({ cart, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Create payment intent on backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-payment-intent`,
        {
          items: cart,
          customerEmail: form.email,
          customerName: form.name,
        }
      );

      // 2. Confirm card payment on Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: form.name, email: form.email },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess({ orderId: data.orderId, email: form.email });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Card Details</label>
        <div className="stripe-element-wrapper">
          <CardElement options={CARD_STYLE} />
        </div>
        <small style={{ color: "#697386", fontSize: "0.78rem", marginTop: "0.3rem", display: "block" }}>
          Test card: 4242 4242 4242 4242 · Any future date · Any CVC
        </small>
      </div>

      {error && <p className="error-msg">⚠ {error}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!stripe || loading}
        style={{ width: "100%", marginTop: "1rem", padding: "0.8rem" }}
      >
        {loading ? <span className="spinner" /> : `Pay $${(total / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

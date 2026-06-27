import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 7999, description: "Premium noise-cancelling sound.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 2, name: "Mechanical Keyboard", price: 12999, description: "Tactile RGB backlit switches.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
  { id: 3, name: "USB-C Hub 7-in-1", price: 4999, description: "Expand your ports instantly.", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80" },
  { id: 4, name: "Laptop Stand", price: 3499, description: "Ergonomic aluminium riser.", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
      {/* Products */}
      <div>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.4rem" }}>🛍 Products</h2>
        <div className="products-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <div className="product-card-body">
                <h3>{p.name}</h3>
                <div className="price">${(p.price / 100).toFixed(2)}</div>
                <p>{p.description}</p>
                <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div style={{ position: "sticky", top: "76px" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>🛒 Cart</h2>
        {cart.length === 0 ? (
          <div className="card" style={{ textAlign: "center", color: "#697386", padding: "2rem" }}>
            Your cart is empty
          </div>
        ) : (
          <div className="cart-summary">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name} × {item.quantity}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <strong>${((item.price * item.quantity) / 100).toFixed(2)}</strong>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f44336", fontSize: "1rem" }}>✕</button>
                </span>
              </div>
            ))}
            <div className="cart-total">
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={() => navigate("/checkout", { state: { cart } })}
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

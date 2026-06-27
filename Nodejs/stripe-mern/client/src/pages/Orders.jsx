import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const fetchOrders = async (filterEmail = "") => {
    setLoading(true);
    try {
      const url = filterEmail
        ? `${import.meta.env.VITE_API_URL}/orders/customer/${filterEmail}`
        : `${import.meta.env.VITE_API_URL}/orders`;
      const { data } = await axios.get(url);
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders(search.trim());
  };

  const badgeClass = (status) => ({
    paid: "badge badge-paid",
    pending: "badge badge-pending",
    failed: "badge badge-failed",
  }[status] || "badge");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.4rem" }}>📦 Orders</h2>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="email"
            placeholder="Filter by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "0.5rem 0.8rem", border: "1.5px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.9rem", width: "220px" }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Search</button>
          {search && <button type="button" className="btn btn-outline" style={{ padding: "0.5rem 0.8rem" }} onClick={() => { setSearch(""); fetchOrders(); }}>Clear</button>}
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#697386" }}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem", color: "#697386" }}>No orders found.</div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#697386" }}>{order._id.slice(-8)}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div style={{ fontSize: "0.78rem", color: "#697386" }}>{order.customerEmail}</div>
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>
                    {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </td>
                  <td style={{ fontWeight: 700 }}>${(order.totalAmount / 100).toFixed(2)}</td>
                  <td><span className={badgeClass(order.status)}>{order.status}</span></td>
                  <td style={{ fontSize: "0.82rem", color: "#697386" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

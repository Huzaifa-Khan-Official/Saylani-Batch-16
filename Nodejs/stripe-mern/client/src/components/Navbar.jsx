import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        ⚡ StripeMERN
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Shop</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </nav>
  );
}

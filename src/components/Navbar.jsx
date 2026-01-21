import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  function linkStyle(path) {
    return {
      marginRight: "15px",
      textDecoration: "none",
      color: pathname === path ? "#0d6efd" : "#333",
      fontWeight: pathname === path ? "bold" : "normal",
    };
  }

  return (
    <nav
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <Link to="/" style={linkStyle("/")}>
        Dashboard
      </Link>
      <Link to="/blueprints" style={linkStyle("/blueprints")}>
        Blueprints
      </Link>
      <Link to="/contracts" style={linkStyle("/contracts")}>
        Contracts
      </Link>
    </nav>
  );
}

export default Navbar;

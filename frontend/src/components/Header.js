import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header({ user }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="header-container">
      <h1>Equip9</h1>
      <div>
        <Link to="/profile" >Profile</Link>
      </div>
      <div>
        <div className="profile-icon">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

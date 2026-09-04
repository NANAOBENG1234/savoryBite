import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineBell, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

function Topbar({ onMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user && user.name ? user.name.split(" ").map((s) => s[0]).join("").slice(0, 2) : "AD").toUpperCase();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="admin-topbar">
      <div className="flex">
        <button className="btn-icon" style={{ marginRight: "0.5rem" }} onClick={onMenu} aria-label="Toggle menu">
          <HiOutlineMenuAlt3 />
        </button>
        <span className="topbar-title">Control Center</span>
      </div>
      <div className="topbar-right">
        <button className="topbar-badge" aria-label="Notifications">
          <HiOutlineBell />
          <span className="dot" />
        </button>
        <div className="admin-avatar">
          <div className="admin-avatar-img">{initials}</div>
          <div>
            <div className="admin-avatar-name">{user ? user.name : "Admin"}</div>
            <div className="admin-avatar-role">Administrator</div>
          </div>
        </div>
        <button className="btn-icon" onClick={handleLogout} aria-label="Logout" title="Logout">
          <HiOutlineLogout />
        </button>
      </div>
    </header>
  );
}

export default Topbar;

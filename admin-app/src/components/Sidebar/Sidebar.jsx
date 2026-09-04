import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome, HiOutlineShoppingBag, HiOutlineClipboardList,
  HiOutlineViewGrid, HiOutlineUserGroup, HiOutlineChartBar, HiOutlineCog,
} from "react-icons/hi";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: <HiOutlineHome />, end: true },
    { to: "/orders", label: "Orders", icon: <HiOutlineShoppingBag /> },
    { to: "/menu", label: "Menu", icon: <HiOutlineClipboardList /> },
    { to: "/kitchen", label: "Kitchen", icon: <HiOutlineViewGrid /> },
    { to: "/customers", label: "Customers", icon: <HiOutlineUserGroup /> },
    { to: "/analytics", label: "Analytics", icon: <HiOutlineChartBar /> },
    { to: "/settings", label: "Settings", icon: <HiOutlineCog /> },
  ];

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(18,26,49,0.5)", zIndex: 1150 }} />}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <span className="sidebar-logo-mark">S</span>
          </div>
          <div>
            <div className="sidebar-brand-name">SavoryBite</div>
            <div className="sidebar-brand-sub">Admin</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Manage</div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.icon}
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

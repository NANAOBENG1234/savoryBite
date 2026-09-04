import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineCash, HiOutlineCollection, HiOutlineUsers, HiOutlineViewGrid } from "react-icons/hi";
import { useApi } from "../../hooks/useApi";
import { formatPrice } from "../../utils/formatPrice";
import { statusLabel, statusClass } from "../../utils/status";

const LOADER = "🕐";

function StatCard({ icon, label, value, tone, delta }) {
  const toneBg = {
    terracotta: "rgba(232,105,58,0.12)",
    indigo: "rgba(26,37,68,0.10)",
    gold: "rgba(201,149,14,0.14)",
    emerald: "rgba(45,143,94,0.12)",
  };
  const toneColor = {
    terracotta: "var(--terracotta-600)",
    indigo: "var(--indigo-600)",
    gold: "var(--gold-600)",
    emerald: "var(--emerald-600)",
  };
  return (
    <div className="card card-pad stat-card">
      <div className="stat-card-icon" style={{ background: toneBg, color: toneColor[tone] }}>{icon}</div>
      <h4>{label}</h4>
      <div className="stat-card-value">{value}</div>
      {delta && <span className={`stat-card-delta ${delta.direction || "pos"}`}>{delta.text}</span>}
    </div>
  );
}

function Dashboard() {
  const stats = useApi("/admin/stats");
  const recent = useApi("/admin/recent-orders");

  const cards = [
    { icon: <HiOutlineShoppingCart />, label: "Total orders", value: stats.data ? stats.data.totalOrders : LOADER, tone: "terracotta" },
    { icon: <HiOutlineCash />, label: "Revenue", value: stats.data ? formatPrice(stats.data.revenue) : LOADER, tone: "emerald" },
    { icon: <HiOutlineCollection />, label: "Menu items", value: stats.data ? stats.data.totalFoods : LOADER, tone: "indigo" },
    { icon: <HiOutlineUsers />, label: "Customers", value: stats.data ? stats.data.totalCustomers : LOADER, tone: "gold" },
  ];

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Welcome back — here's how SavoryBite is performing.</p>

      <div className="grid grid-cards mb-3">
        {cards.map((c, i) => <StatCard key={i} {...c} />)}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3>Recent orders</h3>
            <Link to="/orders" className="btn btn-ghost btn-sm">View all</Link>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.loading && (
                  <tr><td colSpan="4" className="muted" style={{ textAlign: "center", padding: "2rem" }}>Loading…</td></tr>
                )}
                {!recent.loading && recent.data && recent.data.length === 0 && (
                  <tr><td colSpan="4" className="muted" style={{ textAlign: "center", padding: "2rem" }}>No orders yet.</td></tr>
                )}
                {recent.data && recent.data.map((o) => (
                  <tr key={o.id}>
                    <td className="bold">#{o.id}</td>
                    <td>{o.customer_name || `User ${o.user_id}`}</td>
                    <td>{formatPrice(o.total)}</td>
                    <td><span className={`badge ${statusClass(o.status)}`}>{statusLabel(o.status)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
            <h3>Quick actions</h3>
          </div>
          <div className="grid grid-2">
            <Link to="/orders" className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>Manage orders</Link>
            <Link to="/menu" className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>Edit menu</Link>
            <Link to="/kitchen" className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>Kitchen queue</Link>
            <Link to="/analytics" className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>View analytics</Link>
          </div>
          <div className="mt-4 card" style={{ padding: "1.25rem", background: "linear-gradient(135deg,var(--indigo-800),var(--indigo-900))" }}>
            <div className="flex" style={{ color: "#fff" }}>
              <HiOutlineViewGrid style={{ fontSize: "1.6rem", color: "var(--gold-300)" }} />
              <div>
                <div className="bold" style={{ color: "#fff" }}>Kitchen display</div>
                <div className="small" style={{ color: "rgba(255,253,248,0.7)" }}>
                  {stats.data ? `${stats.data.pendingOrders} order(s) in progress` : "Loading…"}
                </div>
              </div>
            </div>
            <Link to="/kitchen" className="btn btn-primary btn-sm mt-2">Open kitchen</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

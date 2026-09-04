import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { HiOutlineRefresh } from "react-icons/hi";
import { api } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { formatPrice } from "../../utils/formatPrice";
import { statusLabel, statusClass, orderStatuses } from "../../utils/status";

function parseItems(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw); } catch { return []; }
}

function ItemsSummary({ items }) {
  if (!items || items.length === 0) return <span className="muted">—</span>;
  const first = items[0];
  const rest = items.length - 1;
  return (
    <span title={items.map((i) => `${i.quantity || 1}× ${i.name}`).join(", ")}>
      {first.quantity || 1}× {first.name}{rest > 0 ? ` +${rest} more` : ""}
    </span>
  );
}

function Orders() {
  const [filter, setFilter] = useState("all");
  const buildPath = filter === "all" ? "/orders" : `/orders?status=${filter}`;
  const { data, loading, reload } = useApi(buildPath, [filter]);
  const [updating, setUpdating] = useState(null);

  const changeStatus = useCallback(async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order #${orderId} → ${statusLabel(newStatus)}`);
      reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUpdating(null);
    }
  }, [reload]);

  const orders = data || [];

  return (
    <>
      <div className="flex-between flex-wrap mb-3">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-subtitle">View and update customer orders.</p>
        </div>
        <button className="btn btn-ghost" onClick={reload}><HiOutlineRefresh /> Refresh</button>
      </div>

      <div className="flex flex-wrap mb-3">
        <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        {orderStatuses().map((s) => (
          <button key={s} className={`chip ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{statusLabel(s)}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="7" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>Loading orders…</td></tr>
              )}
              {!loading && orders.length === 0 && (
                <tr><td colSpan="7" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>No orders found.</td></tr>
              )}
              {orders.map((o) => {
                const items = parseItems(o.items);
                const isActive = ["pending", "confirmed", "preparing"].includes(o.status);
                return (
                  <tr key={o.id} style={isActive ? { background: "rgba(232,105,58,0.03)" } : undefined}>
                    <td className="bold">#{o.id}</td>
                    <td>
                      <div>{o.customer_name || `User ${o.user_id}`}</div>
                      {o.customer_email && <div className="small muted">{o.customer_email}</div>}
                    </td>
                    <td><ItemsSummary items={items} /></td>
                    <td className="bold">{formatPrice(o.total)}</td>
                    <td><span className={`badge ${statusClass(o.status)}`}>{statusLabel(o.status)}</span></td>
                    <td className="small muted">{o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"}</td>
                    <td style={{ textAlign: "right" }}>
                      <select
                        className="select-input"
                        value={o.status}
                        disabled={updating === o.id}
                        onChange={(e) => changeStatus(o.id, e.target.value)}
                        style={{ minWidth: "140px" }}
                      >
                        {orderStatuses().map((s) => (
                          <option key={s} value={s}>{statusLabel(s)}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Orders;

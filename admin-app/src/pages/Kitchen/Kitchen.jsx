import React, { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { HiOutlineRefresh } from "react-icons/hi";
import { api } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { formatPrice } from "../../utils/formatPrice";
import { statusLabel, statusClass } from "../../utils/status";

function parseItems(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw); } catch { return []; }
}

const NEXT_STATUS = { pending: "confirmed", confirmed: "preparing", preparing: "out_for_delivery" };
const NEXT_LABEL = { pending: "Start preparing", confirmed: "Mark as preparing", preparing: "Mark ready for delivery" };
const ORDER_TIME = { pending: 0, confirmed: 1, preparing: 2 };

function OrderCard({ order, onAdvance }) {
  const items = parseItems(order.items);
  const orderIdx = ORDER_TIME[order.status] || 0;
  const timeSince = order.created_at ? Math.floor((Date.now() - new Date(order.created_at).getTime()) / 60000) : 0;
  const urgency = timeSince > 30 ? "high" : timeSince > 15 ? "mid" : "low";
  return (
    <div className="card card-pad kitchen-card" style={{ borderLeft: urgency === "high" ? "4px solid var(--error)" : urgency === "mid" ? "4px solid var(--gold-500)" : "4px solid transparent" }}>
      <div className="flex-between mb-2">
        <div className="bold" style={{ fontSize: "1.05rem" }}>#{order.id}</div>
        <span className={`badge ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
      </div>
      <div className="small muted mb-2">{order.customer_name || `User ${order.user_id}`}</div>
      <div className="mb-2">
        {items.map((it, i) => (
          <div key={i} className="flex-between" style={{ padding: "0.25rem 0", borderBottom: "1px solid rgba(26,37,68,0.05)" }}>
            <span>{it.quantity || 1}× {it.name}</span>
            <span className="small muted">{formatPrice((it.price || 0) * (it.quantity || 1))}</span>
          </div>
        ))}
      </div>
      {order.notes && <div className="small" style={{ color: "var(--terracotta-600)", marginBottom: "0.75rem" }}>Note: {order.notes}</div>}
      <div className="flex-between" style={{ marginTop: "auto" }}>
        <div className="small muted">{timeSince > 0 ? `${timeSince}m ago` : "Just now"}</div>
        {NEXT_STATUS[order.status] && (
          <button className="btn btn-primary btn-sm" onClick={() => onAdvance(order)}>{NEXT_LABEL[order.status]}</button>
        )}
      </div>
    </div>
  );
}

function Kitchen() {
  const { data, loading, reload } = useApi("/admin/kitchen-orders");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(reload, 10000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoRefresh, reload]);

  const advance = useCallback(async (order) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    try {
      await api.patch(`/admin/advance-order/${order.id}`, { status: order.status });
      toast.success(`#${order.id} → ${statusLabel(next)}`);
      reload();
    } catch (e) {
      toast.error(e.message);
    }
  }, [reload]);

  const orders = data || [];
  const pending = orders.filter((o) => o.status === "pending");
  const confirmed = orders.filter((o) => o.status === "confirmed");
  const preparing = orders.filter((o) => o.status === "preparing");

  return (
    <>
      <div className="flex-between flex-wrap mb-3">
        <div>
          <h1 className="page-title">Kitchen Display</h1>
          <p className="page-subtitle">Live order preparation queue.</p>
        </div>
        <div className="flex">
          <button className="btn btn-ghost btn-sm" onClick={() => setAutoRefresh(!autoRefresh)}>
            {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={reload}><HiOutlineRefresh /></button>
        </div>
      </div>

      {loading && orders.length === 0 && (
        <div className="loader-wrap"><div className="loader" /></div>
      )}

      {!loading && orders.length === 0 && (
        <div className="card card-pad empty-state" style={{ textAlign: "center" }}>
          <div className="empty-state-icon">👨‍🍳</div>
          <p>No active orders in the kitchen.</p>
        </div>
      )}

      {orders.length > 0 && (
        <>
          {[
            { label: "Pending", list: pending, tone: "rgba(229,154,23,0.08)" },
            { label: "Confirmed", list: confirmed, tone: "rgba(76,88,153,0.08)" },
            { label: "Preparing", list: preparing, tone: "rgba(232,105,58,0.08)" },
          ].filter((g) => g.list.length > 0).map((group) => (
            <div key={group.label} className="mb-3">
              <h3 style={{ marginBottom: "0.75rem" }}>{group.label} <span className="muted">({group.list.length})</span></h3>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {group.list.map((o) => <OrderCard key={o.id} order={o} onAdvance={advance} />)}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Kitchen;

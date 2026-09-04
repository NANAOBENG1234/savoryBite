import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineTrendingUp,
  HiOutlineEmojiHappy,
  HiOutlineExclamation,
} from "react-icons/hi";
import { useApi } from "../../hooks/useApi";
import { formatPrice } from "../../utils/formatPrice";
import { statusLabel, statusClass } from "../../utils/status";

const LOADER = "🕐";

function Bar({ value, max, tone }) {
  const pct = max ? Math.max(4, Math.round((value / max) * 100)) : 4;
  return (
    <div className="bar-track">
      <div className="bar-fill" style={{ width: `${pct}%`, background: tone }} />
    </div>
  );
}

function Analytics() {
  const stats = useApi("/admin/stats");
  const analytics = useApi("/admin/analytics");

  const a = analytics.data;
  const maxRevenue = a && a.dailyRevenue.length ? Math.max(...a.dailyRevenue.map((d) => d.revenue)) : 0;
  const maxFood = a && a.topFoods.length ? Math.max(...a.topFoods.map((f) => f.quantity)) : 0;
  const totalStatus = a ? a.statusBreakdown.reduce((s, x) => s + x.count, 0) : 0;

  const summary = [
    { label: "Total revenue", value: stats.data ? formatPrice(stats.data.revenue) : LOADER, icon: <HiOutlineTrendingUp />, tone: "var(--emerald-600)", bg: "rgba(45,143,94,0.12)" },
    { label: "Order volume", value: stats.data ? stats.data.totalOrders : LOADER, icon: <HiOutlineChartBar />, tone: "var(--terracotta-600)", bg: "rgba(232,105,58,0.12)" },
    { label: "Active customers", value: stats.data ? stats.data.totalCustomers : LOADER, icon: <HiOutlineEmojiHappy />, tone: "var(--gold-600)", bg: "rgba(201,149,14,0.14)" },
  ];

  return (
    <>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">Sales, revenue and performance insights.</p>

      <div className="grid grid-cards mb-3">
        {summary.map((s, i) => (
          <div className="card card-pad stat-card" key={i}>
            <div className="stat-card-icon" style={{ background: s.bg, color: s.tone }}>{s.icon}</div>
            <h4>{s.label}</h4>
            <div className="stat-card-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card card-pad">
          <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
            <h3>Daily revenue</h3>
          </div>
          {analytics.loading && <div className="muted">Loading…</div>}
          {!analytics.loading && a && a.dailyRevenue.length === 0 && (
            <div className="empty-state" style={{ padding: "2rem" }}>
              <div className="empty-state-icon">📊</div>
              <p>No completed orders yet.</p>
            </div>
          )}
          {a && a.dailyRevenue.length > 0 && (
            <div>
              {a.dailyRevenue.map((d) => (
                <div key={d.day} className="bar-row">
                  <div className="bar-label">{d.day}</div>
                  <div className="grow">
                    <Bar value={d.revenue} max={maxRevenue} tone="linear-gradient(90deg,var(--terracotta-400),var(--terracotta-600))" />
                  </div>
                  <div className="bar-value">{formatPrice(d.revenue)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card card-pad">
          <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
            <h3>Order status breakdown</h3>
          </div>
          {analytics.loading && <div className="muted">Loading…</div>}
          {!analytics.loading && a && a.statusBreakdown.length === 0 && (
            <div className="empty-state" style={{ padding: "2rem" }}>
              <div className="empty-state-icon">🧾</div>
              <p>No orders recorded yet.</p>
            </div>
          )}
          {a && a.statusBreakdown.length > 0 && (
            <div>
              {a.statusBreakdown.map((s) => (
                <div key={s.status} className="bar-row">
                  <span className="badge" style={{ minWidth: 130 }}>{statusLabel(s.status)}</span>
                  <div className="grow">
                    <Bar value={s.count} max={totalStatus} tone="var(--indigo-400)" />
                  </div>
                  <div className="bar-value">{s.count}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card card-pad mt-3">
        <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
          <h3>Top selling items</h3>
        </div>
        {analytics.loading && <div className="muted">Loading…</div>}
        {!analytics.loading && a && a.topFoods.length === 0 && (
          <div className="empty-state" style={{ padding: "2rem" }}>
            <div className="empty-state-icon">🍽️</div>
            <p>No item sales to report yet.</p>
          </div>
        )}
        {a && a.topFoods.length > 0 && (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Units sold</th>
                  <th>Revenue</th>
                  <th style={{ width: "30%" }}>Share</th>
                </tr>
              </thead>
              <tbody>
                {a.topFoods.map((f, i) => (
                  <tr key={f.name}>
                    <td className="muted">{i + 1}</td>
                    <td className="bold">{f.name}</td>
                    <td>{f.quantity}</td>
                    <td>{formatPrice(f.revenue)}</td>
                    <td>
                      <div className="phantom-empty" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div className="grow">
                          <Bar value={f.quantity} max={maxFood} tone="var(--gold-500)" />
                        </div>
                        <span className="small muted">{Math.round((f.quantity / maxFood) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Analytics;

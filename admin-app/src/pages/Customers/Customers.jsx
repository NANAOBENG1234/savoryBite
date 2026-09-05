import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useApi } from "../../hooks/useApi";
import { formatPrice } from "../../utils/formatPrice";
import UserAvatar from "../../components/UI/UserAvatar";

function Customers() {
  const { data, loading } = useApi("/admin/customers");
  const [query, setQuery] = useState("");

  const customers = (data || []).filter((c) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (c.name || "").toLowerCase().includes(q) || (c.email || "").toLowerCase().includes(q);
  });

  return (
    <>
      <h1 className="page-title">Customers</h1>
      <p className="page-subtitle">Customer profiles and ordering insights.</p>

      <div className="search-input mb-3" style={{ maxWidth: "360px" }}>
        <HiOutlineSearch />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email…" />
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Orders</th>
                <th>Total spend</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="5" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>Loading customers…</td></tr>
              )}
              {!loading && customers.length === 0 && (
                <tr><td colSpan="5" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>
                  {data && data.length === 0 ? "No customers yet." : "No customers match your search."}
                </td></tr>
              )}
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="flex">
                      <UserAvatar name={c.name} />
                      <div>
                        <div className="bold">{c.name}</div>
                        <div className="small muted">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${c.role === "admin" ? "badge-available" : "badge-confirmed"}`} style={{ textTransform: "capitalize" }}>{c.role}</span>
                  </td>
                  <td className="small muted">{c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}</td>
                  <td className="bold">{c.total_orders}</td>
                  <td className="bold">{formatPrice(c.total_spend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Customers;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineSearch, HiOutlineUserAdd, HiOutlinePencilAlt, HiOutlineBan } from "react-icons/hi";
import { useApi } from "../../hooks/useApi";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import UserAvatar from "../../components/UI/UserAvatar";
import RoleBadge from "../../components/UI/RoleBadge";
import AddStaffModal from "./AddStaffModal";
import EditStaffModal from "./EditStaffModal";

function Staff() {
  const { data, loading, reload } = useApi("/admin/staff");
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const rows = (data || []).filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (s.name || "").toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q);
  });

  async function toggleActive(s) {
    try {
      const next = s.is_active === false;
      await api.patch(`/admin/staff/${s.id}`, { is_active: next });
      toast.success(next ? `${s.name} activated` : `${s.name} deactivated`);
      reload();
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  }

  return (
    <>
      <h1 className="page-title">Staff</h1>
      <p className="page-subtitle">Create and manage staff accounts for SavoryBite.</p>

      <div className="flex-between mb-3" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div className="search-input" style={{ maxWidth: "360px", flex: 1 }}>
          <HiOutlineSearch />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email…" />
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          <HiOutlineUserAdd /> Add staff
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Orders</th>
                <th>Spend</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="7" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>Loading staff…</td></tr>
              )}
              {!loading && rows.length === 0 && (
                <tr><td colSpan="7" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>
                  {data && data.length === 0 ? "No staff accounts yet. Add one to get started." : "No staff match your search."}
                </td></tr>
              )}
              {rows.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex">
                      <UserAvatar name={s.name} />
                      <div>
                        <div className="bold">{s.name}</div>
                        <div className="small muted">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><RoleBadge role={s.role} /></td>
                  <td className="small muted">{s.created_at ? new Date(s.created_at).toLocaleDateString() : "—"}</td>
                  <td className="bold">{s.total_orders}</td>
                  <td className="bold">{formatPrice(s.total_spend)}</td>
                  <td>
                    <span className={`badge ${s.is_active ? "badge-available" : "badge-cancelled"}`}>
                      {s.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div className="flex" style={{ justifyContent: "flex-end", gap: "0.4rem" }}>
                      <button className="btn btn-icon btn-ghost" title="Edit" aria-label="Edit staff" onClick={() => setEditing(s)}>
                        <HiOutlinePencilAlt />
                      </button>
                      <button
                        className={`btn btn-icon ${s.is_active ? "btn-danger" : "btn-secondary"}`}
                        title={s.is_active ? "Deactivate" : "Activate"}
                        aria-label={s.is_active ? "Deactivate staff" : "Activate staff"}
                        onClick={() => toggleActive(s)}
                      >
                        <HiOutlineBan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddStaffModal onClose={() => setShowAdd(false)} onCreated={() => { setShowAdd(false); reload(); }} />}
      {editing && <EditStaffModal staff={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); reload(); }} />}
    </>
  );
}

export default Staff;
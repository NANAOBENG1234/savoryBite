import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";
import { api } from "../../services/api";

function EditStaffModal({ staff, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: staff.name || "",
    email: staff.email || "",
    role: staff.role || "staff",
  });
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSaving(true);
    try {
      await api.patch(`/admin/staff/${staff.id}`, form);
      toast.success("Staff updated");
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not update staff");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit staff</h3>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close"><HiOutlineX /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label>Full name</label>
              <input value={form.name} onChange={set("name")} autoFocus />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={set("email")} />
            </div>
            <div className="field">
              <label>Role</label>
              <select value={form.role} onChange={set("role")}>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStaffModal;
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineX } from "react-icons/hi";
import { api } from "../../services/api";

function AddStaffModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "staff" });
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
      toast.error("Name, a valid email and a 6+ char password are required");
      return;
    }
    setSaving(true);
    try {
      await api.post("/admin/staff", form);
      toast.success(`Staff ${form.name} created`);
      onCreated();
    } catch (err) {
      toast.error(err.message || "Could not create staff");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add staff</h3>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close"><HiOutlineX /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label>Full name</label>
              <input value={form.name} onChange={set("name")} placeholder="e.g. Kofi Mensah" autoFocus />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder="staff@savorybite.com" />
            </div>
            <div className="field-row">
              <div className="field">
                <label>Password</label>
                <input type="password" value={form.password} onChange={set("password")} placeholder="min 6 characters" />
              </div>
              <div className="field">
                <label>Role</label>
                <select value={form.role} onChange={set("role")}>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Creating…" : "Create staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaffModal;
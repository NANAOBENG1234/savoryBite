import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineSave, HiOutlineOfficeBuilding, HiOutlineClock, HiOutlinePhone } from "react-icons/hi";
import { AiOutlineShopping } from "react-icons/ai";

const STORAGE_KEY = "sb_admin_settings";

const DEFAULTS = {
  restaurantName: "SavoryBite",
  tagline: "Sahel-inspired flavors, delivered to your door.",
  deliveryFee: 500,
  taxRate: 7.5,
  currency: "₦",
  phone: "+234 800 000 0000",
  email: "hello@savorybite.com",
  address: "12 Lake Road, Accra",
  openingHours: "Mon – Sun · 10:00 AM – 10:00 PM",
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function Settings() {
  const [form, setForm] = useState(load());
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      setSaved(true);
      toast.success("Settings saved");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Could not save settings");
    }
  };

  return (
    <>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Platform configuration and preferences.</p>

      <form onSubmit={handleSave}>
        <div className="card card-pad mb-3">
          <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <HiOutlineOfficeBuilding style={{ color: "var(--terracotta-600)" }} /> Store details
            </h3>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Restaurant name</label>
              <input value={form.restaurantName} onChange={set("restaurantName")} />
            </div>
            <div className="field">
              <label>Currency</label>
              <input value={form.currency} onChange={set("currency")} />
            </div>
          </div>
          <div className="field">
            <label>Tagline</label>
            <input value={form.tagline} onChange={set("tagline")} />
          </div>
          <div className="field">
            <label>Address</label>
            <input value={form.address} onChange={set("address")} />
          </div>
        </div>

        <div className="card card-pad mb-3">
          <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AiOutlineShopping style={{ color: "var(--terracotta-600)" }} /> Pricing & operations
            </h3>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Delivery fee ({form.currency})</label>
              <input type="number" min="0" value={form.deliveryFee} onChange={set("deliveryFee")} />
            </div>
            <div className="field">
              <label>Tax rate (%)</label>
              <input type="number" min="0" step="0.1" value={form.taxRate} onChange={set("taxRate")} />
            </div>
          </div>
          <div className="field">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <HiOutlineClock style={{ color: "var(--terracotta-600)" }} /> Opening hours
            </label>
            <input value={form.openingHours} onChange={set("openingHours")} />
          </div>
        </div>

        <div className="card card-pad mb-3">
          <div className="card-header" style={{ padding: 0, border: "none", marginBottom: "1.5rem" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <HiOutlinePhone style={{ color: "var(--terracotta-600)" }} /> Contact
            </h3>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Phone</label>
              <input value={form.phone} onChange={set("phone")} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={set("email")} />
            </div>
          </div>
        </div>

        <div className="flex-between">
          <span className="small muted">{saved ? "Saved ✓" : "Changes are stored locally on this device."}</span>
          <button className="btn btn-primary" type="submit">
            <HiOutlineSave /> Save settings
          </button>
        </div>
      </form>
    </>
  );
}

export default Settings;

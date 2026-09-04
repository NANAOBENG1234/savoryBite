import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiPencilAlt, HiTrash, HiX, HiOutlineSearch } from "react-icons/hi";
import { api } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { formatPrice } from "../../utils/formatPrice";

const EMPTY = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  rating: 4.5,
};

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close"><HiX /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function FoodForm({ initial, categories, onSubmit }) {
  const [form, setForm] = useState(initial);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      description: form.description.trim(),
      image: form.image.trim(),
      rating: Number(form.rating || 4.5),
    };
    if (!payload.name || !payload.price) {
      toast.error("Name and price are required.");
      return;
    }
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Name</label>
        <input value={form.name} onChange={set("name")} placeholder="Jollof Rice Deluxe" required />
      </div>
      <div className="field-row">
        <div className="field">
          <label>Price (₦)</label>
          <input type="number" min="0" step="0.01" value={form.price} onChange={set("price")} placeholder="28" required />
        </div>
        <div className="field">
          <label>Category</label>
          <input list="food-categories" value={form.category} onChange={set("category")} placeholder="rice, soups, grills…" required />
          <datalist id="food-categories">
            {categories.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>
      <div className="field">
        <label>Description</label>
        <textarea value={form.description} onChange={set("description")} placeholder="Short description of the dish" />
      </div>
      <div className="field">
        <label>Image URL</label>
        <input value={form.image} onChange={set("image")} placeholder="https://images.unsplash.com/photo-…" />
      </div>
      <div className="field">
        <label>Rating</label>
        <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={set("rating")} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Save food</button>
    </form>
  );
}

function Menu() {
  const foods = useApi("/foods");
  const cats = useApi("/admin/categories");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const categories = cats.data || [];
  const all = foods.data || [];

  const filtered = all.filter((f) => {
    const matchesQ = !query || f.name.toLowerCase().includes(query.toLowerCase());
    const matchesC = filter === "all" || f.category === filter;
    return matchesQ && matchesC;
  });

  const saveFood = async (payload) => {
    try {
      if (editing) {
        await api.put(`/foods/${editing.id}`, payload);
        toast.success("Food updated.");
      } else {
        await api.post("/foods", payload);
        toast.success("Food added.");
      }
      setEditing(null);
      setCreating(false);
      foods.reload();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.del(`/foods/${deleting.id}`);
      toast.success("Food deleted.");
      setDeleting(null);
      foods.reload();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="flex-between flex-wrap mb-3">
        <div>
          <h1 className="page-title">Menu</h1>
          <p className="page-subtitle">Manage menu items and categories.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setCreating(true); setEditing(null); }}>
          <HiOutlinePlus /> Add food
        </button>
      </div>

      <div className="flex flex-wrap mb-3">
        <div className="search-input grow" style={{ maxWidth: "360px" }}>
          <HiOutlineSearch />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search foods…" />
        </div>
        <button className={`chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        {categories.map((c) => (
          <button key={c} className={`chip ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.loading && (
                <tr><td colSpan="5" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>Loading foods…</td></tr>
              )}
              {!foods.loading && filtered.length === 0 && (
                <tr><td colSpan="5" className="muted" style={{ textAlign: "center", padding: "2.5rem" }}>
                  {all.length === 0 ? "No foods yet. Add your first dish." : "No foods match your search."}
                </td></tr>
              )}
              {filtered.map((f) => (
                <tr key={f.id}>
                  <td>
                    <div className="flex">
                      {f.image && <img src={f.image} alt="" style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover" }} />}
                      <div>
                        <div className="bold">{f.name}</div>
                        <div className="small muted" style={{ maxWidth: "340px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.description}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-confirmed" style={{ textTransform: "capitalize" }}>{f.category}</span></td>
                  <td className="bold">{formatPrice(f.price)}</td>
                  <td className="muted">{f.rating ? `${f.rating} ★` : "—"}</td>
                  <td style={{ textAlign: "right" }}>
                    <div className="flex" style={{ justifyContent: "flex-end" }}>
                      <button className="btn btn-ghost btn-icon" aria-label="Edit" onClick={() => { setCreating(false); setEditing(f); }}>
                        <HiPencilAlt />
                      </button>
                      <button className="btn btn-danger btn-icon" aria-label="Delete" onClick={() => setDeleting(f)}>
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {creating && (
        <Modal title="Add food" onClose={() => setCreating(false)}>
          <FoodForm initial={EMPTY} categories={categories} onClose={() => setCreating(false)} onSubmit={saveFood} />
        </Modal>
      )}

      {editing && (
        <Modal title="Edit food" onClose={() => setEditing(null)}>
          <FoodForm
            initial={{ ...EMPTY, ...editing }}
            categories={categories}
            onClose={() => setEditing(null)}
            onSubmit={saveFood}
          />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete food" onClose={() => setDeleting(null)}>
          <p className="muted">Are you sure you want to delete <strong>{deleting.name}</strong>? This cannot be undone.</p>
          <div className="modal-footer" style={{ padding: "1rem 0 0" }}>
            <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Menu;

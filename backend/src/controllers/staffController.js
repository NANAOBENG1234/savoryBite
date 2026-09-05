const bcrypt = require("bcryptjs");
const db = require("../../config/db");

const STAFF_ROLES = ["staff", "admin"];

exports.getStaff = (req, res) => {
  db.query(
    `SELECT u.id, u.name, u.email, u.role, u.is_active, u.created_at,
            COUNT(o.id) AS total_orders,
            COALESCE(SUM(o.total), 0) AS total_spend
     FROM users u
     LEFT JOIN orders o ON o.user_id = u.id
     WHERE u.role IN ('staff', 'admin')
     GROUP BY u.id
     ORDER BY u.created_at DESC`,
    (err, r) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(r.rows.map((u) => ({
        ...u,
        total_orders: Number(u.total_orders),
        total_spend: Number(u.total_spend),
        is_active: u.is_active === true || u.is_active === "true",
      })));
    }
  );
};

exports.createStaff = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }
  const targetRole = STAFF_ROLES.includes(role) ? role : "staff";
  try {
    const hash = await bcrypt.hash(String(password), 12);
    db.query(
      "INSERT INTO users(name,email,password,role,is_active) VALUES($1,$2,$3,$4,TRUE) RETURNING id,name,email,role,is_active,created_at",
      [name, email, hash, targetRole],
      (err, r) => {
        if (err) {
          if (err.code === "23505") return res.status(409).json({ error: "Email already registered" });
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(r.rows[0]);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStaff = (req, res) => {
  const { id } = req.params;
  const { name, email, role, is_active } = req.body;
  if (!name && !email && !role && is_active === undefined) {
    return res.status(400).json({ error: "Nothing to update" });
  }
  if (email && !String(email).includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  const updates = [];
  const params = [];
  if (name) { params.push(name); updates.push(`name = $${params.length}`); }
  if (email) { params.push(email); updates.push(`email = $${params.length}`); }
  if (role && STAFF_ROLES.includes(role)) { params.push(role); updates.push(`role = $${params.length}`); }
  if (is_active !== undefined) { params.push(is_active === true || is_active === "true"); updates.push(`is_active = $${params.length}`); }
  params.push(id);
  db.query(
    `UPDATE users SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING id,name,email,role,is_active,created_at`,
    params,
    (err, r) => {
      if (err) {
        if (err.code === "23505") return res.status(409).json({ error: "Email already registered" });
        return res.status(500).json({ error: err.message });
      }
      if (r.rows.length === 0) return res.status(404).json({ error: "Staff not found" });
      res.json(r.rows[0]);
    }
  );
};
const db = require("../../config/db");

exports.getStats = (req, res) => {
  const queries = [
    db.query("SELECT COUNT(*) AS total_orders, COALESCE(SUM(total),0) AS revenue FROM orders WHERE status <> 'cancelled'"),
    db.query("SELECT COUNT(*) AS total_foods FROM foods"),
    db.query("SELECT COUNT(DISTINCT user_id) AS total_customers FROM orders"),
    db.query("SELECT COUNT(*) AS pending_orders FROM orders WHERE status IN ('pending','confirmed','preparing')"),
  ];
  Promise.all(queries)
    .then(([o, f, c, p]) => {
      res.json({
        totalOrders: Number(o.rows[0].total_orders),
        revenue: Number(o.rows[0].revenue),
        totalFoods: Number(f.rows[0].total_foods),
        totalCustomers: Number(c.rows[0].total_customers),
        pendingOrders: Number(p.rows[0].pending_orders),
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getRecentOrders = (req, res) => {
  db.query(
    "SELECT o.id,o.total,o.status,o.created_at,u.name AS customer_name,u.email AS customer_email FROM orders o LEFT JOIN users u ON o.user_id=u.id ORDER BY o.created_at DESC LIMIT 8",
    (err, r) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(r.rows);
    }
  );
};

exports.getCategories = (req, res) => {
  db.query(
    "SELECT DISTINCT category FROM foods WHERE category IS NOT NULL AND category <> '' ORDER BY category",
    (err, r) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(r.rows.map((row) => row.category));
    }
  );
};

exports.getKitchenOrders = (req, res) => {
  db.query(
    "SELECT o.id,o.items,o.total,o.status,o.created_at,o.address,o.phone,o.notes,u.name AS customer_name,u.email AS customer_email FROM orders o LEFT JOIN users u ON o.user_id=u.id WHERE o.status IN ('pending','confirmed','preparing') ORDER BY o.created_at ASC",
    (err, r) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(r.rows);
    }
  );
};

const ADVANCE = { pending: "confirmed", confirmed: "preparing", preparing: "out_for_delivery" };

exports.advanceOrder = (req, res) => {
  const { id } = req.params;
  const next = ADVANCE[req.body.status];
  if (!next) return res.status(400).json({ error: "Cannot advance from this status" });
  db.query(
    "UPDATE orders SET status=$1 WHERE id=$2 AND status=$3 RETURNING *",
    [next, id, req.body.status],
    (err, r) => {
      if (err) return res.status(500).json({ error: err.message });
      if (r.rows.length === 0) return res.status(404).json({ error: "Order not found or already advanced" });
      res.json(r.rows[0]);
    }
  );
};

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

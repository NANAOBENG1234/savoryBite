const db = require("../../config/db");
const { lastNDays } = require("../utils/dates");

const DAYS = 14;

function seriesQuery() {
  const start = lastNDays(DAYS)[0];
  return db.query(
    `SELECT TO_CHAR(created_at, 'YYYY-MM-DD') AS day,
            COALESCE(SUM(total), 0) AS revenue,
            COUNT(*) AS orders
     FROM orders
     WHERE status <> 'cancelled' AND created_at >= $1::date
     GROUP BY day
     ORDER BY day ASC`,
    [start]
  );
}

exports.getReports = (req, res) => {
  const summaryQuery = db.query(
    "SELECT COUNT(*) FILTER (WHERE status <> 'cancelled') AS total_orders, COALESCE(SUM(total) FILTER (WHERE status <> 'cancelled'), 0) AS revenue FROM orders"
  );
  const activeCustomersQuery = db.query(
    "SELECT COUNT(DISTINCT user_id) AS active_customers FROM orders WHERE status <> 'cancelled'"
  );
  const seriesPromise = seriesQuery();
  const topFoodsPromise = db.query(
    `WITH expanded AS (
       SELECT jsonb_array_elements(items::jsonb) AS item
       FROM orders WHERE status <> 'cancelled'
     )
     SELECT item->>'name' AS name,
            SUM((item->>'quantity')::int) AS quantity,
            SUM(((item->>'price')::numeric) * (item->>'quantity')::int) AS revenue
     FROM expanded
     WHERE item->>'name' IS NOT NULL
     GROUP BY item->>'name'
     ORDER BY quantity DESC
     LIMIT 8`
  );
  const categoryPromise = db.query(
    `WITH expanded AS (
       SELECT jsonb_array_elements(items::jsonb) AS item
       FROM orders WHERE status <> 'cancelled'
     )
     SELECT f.category AS category,
            COALESCE(SUM((e.item->>'quantity')::int), 0) AS units,
            COALESCE(SUM(((e.item->>'price')::numeric) * (e.item->>'quantity')::int), 0) AS revenue
     FROM expanded e
     LEFT JOIN foods f ON f.name = e.item->>'name'
     WHERE e.item->>'name' IS NOT NULL
     GROUP BY f.category
     ORDER BY revenue DESC`
  );
  const statusPromise = db.query(
    "SELECT status, COUNT(*) AS count FROM orders GROUP BY status ORDER BY count DESC"
  );

  Promise.all([summaryQuery, activeCustomersQuery, seriesPromise, topFoodsPromise, categoryPromise, statusPromise])
    .then(([summary, activeCustomers, series, topFoods, category, statusR]) => {
      const totalOrders = Number(summary.rows[0].total_orders);
      const revenue = Number(summary.rows[0].revenue);
      const activeCustomersCount = Number(activeCustomers.rows[0].active_customers);
      const byDay = new Map(series.rows.map((r) => [r.day, r]));
      const daily = lastNDays(DAYS).map((day) => {
        const row = byDay.get(day);
        return { day, revenue: row ? Number(row.revenue) : 0, orders: row ? Number(row.orders) : 0 };
      });
      res.json({
        summary: {
          revenue,
          totalOrders,
          activeCustomers: activeCustomersCount,
          avgOrderValue: totalOrders ? Math.round((revenue / totalOrders) * 100) / 100 : 0,
        },
        series: daily,
        topFoods: topFoods.rows.map((f) => ({ name: f.name, quantity: Number(f.quantity), revenue: Number(f.revenue) })),
        categoryDistribution: category.rows.map((c) => ({ category: c.category, units: Number(c.units), revenue: Number(c.revenue) })),
        statusDistribution: statusR.rows.map((s) => ({ status: s.status, count: Number(s.count) })),
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
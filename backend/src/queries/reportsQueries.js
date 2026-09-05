const db = require("../../config/db");
const { lastNDays } = require("../utils/dates");

function getSummary() {
  return db.query(
    "SELECT COUNT(*) FILTER (WHERE status <> 'cancelled') AS total_orders, COALESCE(SUM(total) FILTER (WHERE status <> 'cancelled'), 0) AS revenue FROM orders"
  );
}

function getActiveCustomers() {
  return db.query("SELECT COUNT(DISTINCT user_id) AS active_customers FROM orders WHERE status <> 'cancelled'");
}

function getSeries() {
  const start = lastNDays(14)[0];
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

function getTopFoods() {
  return db.query(
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
}

function getCategoryDistribution() {
  return db.query(
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
}

function getStatusDistribution() {
  return db.query("SELECT status, COUNT(*) AS count FROM orders GROUP BY status ORDER BY count DESC");
}

module.exports = { getSummary, getActiveCustomers, getSeries, getTopFoods, getCategoryDistribution, getStatusDistribution };
const { lastNDays } = require("../utils/dates");
const q = require("../queries/reportsQueries");

const DAYS = 14;

exports.getReports = (req, res) => {
  const byDay = new Map();

  Promise.all([
    q.getSummary(),
    q.getActiveCustomers(),
    q.getSeries(),
    q.getTopFoods(),
    q.getCategoryDistribution(),
    q.getStatusDistribution(),
  ])
    .then(([summary, activeCustomers, series, topFoods, category, statusR]) => {
      const totalOrders = Number(summary.rows[0].total_orders);
      const revenue = Number(summary.rows[0].revenue);
      series.rows.forEach((r) => byDay.set(r.day, r));
      const daily = lastNDays(DAYS).map((day) => {
        const row = byDay.get(day);
        return { day, revenue: row ? Number(row.revenue) : 0, orders: row ? Number(row.orders) : 0 };
      });
      res.json({
        summary: {
          revenue,
          totalOrders,
          activeCustomers: Number(activeCustomers.rows[0].active_customers),
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
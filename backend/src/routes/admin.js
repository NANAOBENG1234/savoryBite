const express = require("express");
const router = express.Router();
const c = require("../controllers/adminController");
const { authenticate, adminOnly } = require("../middleware/auth");

router.get("/stats", authenticate, adminOnly, c.getStats);
router.get("/recent-orders", authenticate, adminOnly, c.getRecentOrders);
router.get("/categories", authenticate, adminOnly, c.getCategories);
router.get("/kitchen-orders", authenticate, adminOnly, c.getKitchenOrders);
router.patch("/advance-order/:id", authenticate, adminOnly, c.advanceOrder);
router.get("/customers", authenticate, adminOnly, c.getCustomers);
router.get("/analytics", authenticate, adminOnly, c.getAnalytics);

module.exports = router;

const express = require("express");
const router = express.Router();
const c = require("../controllers/adminController");
const { authenticate, adminOnly } = require("../middleware/auth");

router.get("/stats", authenticate, adminOnly, c.getStats);
router.get("/recent-orders", authenticate, adminOnly, c.getRecentOrders);
router.get("/categories", authenticate, adminOnly, c.getCategories);

module.exports = router;

const express = require("express");
const router = express.Router();
const c = require("../controllers/adminController");
const staff = require("../controllers/staffController");
const { authenticate, adminOnly } = require("../middleware/auth");

router.get("/stats", authenticate, adminOnly, c.getStats);
router.get("/recent-orders", authenticate, adminOnly, c.getRecentOrders);
router.get("/categories", authenticate, adminOnly, c.getCategories);
router.get("/kitchen-orders", authenticate, adminOnly, c.getKitchenOrders);
router.patch("/advance-order/:id", authenticate, adminOnly, c.advanceOrder);
router.get("/customers", authenticate, adminOnly, c.getCustomers);
router.get("/analytics", authenticate, adminOnly, c.getAnalytics);
router.get("/staff", authenticate, adminOnly, staff.getStaff);
router.post("/staff", authenticate, adminOnly, staff.createStaff);
router.patch("/staff/:id", authenticate, adminOnly, staff.updateStaff);

module.exports = router;

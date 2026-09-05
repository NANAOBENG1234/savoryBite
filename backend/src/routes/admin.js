const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
const staff = require("../controllers/staffController");
const reports = require("../controllers/reportsController");
const { authenticate, adminOnly } = require("../middleware/auth");

router.get("/stats", authenticate, adminOnly, adminCtrl.getStats);
router.get("/recent-orders", authenticate, adminOnly, adminCtrl.getRecentOrders);
router.get("/categories", authenticate, adminOnly, adminCtrl.getCategories);
router.get("/kitchen-orders", authenticate, adminOnly, adminCtrl.getKitchenOrders);
router.patch("/advance-order/:id", authenticate, adminOnly, adminCtrl.advanceOrder);
router.get("/customers", authenticate, adminOnly, adminCtrl.getCustomers);
router.get("/analytics", authenticate, adminOnly, adminCtrl.getAnalytics);
router.get("/staff", authenticate, adminOnly, staff.getStaff);
router.post("/staff", authenticate, adminOnly, staff.createStaff);
router.patch("/staff/:id", authenticate, adminOnly, staff.updateStaff);
router.get("/reports", authenticate, adminOnly, reports.getReports);

module.exports = router;

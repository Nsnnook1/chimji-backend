const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/upload");
const adminController = require("../controllers/admin-controller");
const authenticateAdmin = require("../middleware/role-admin");

router.post(
  "/add",
  authenticateAdmin,
  uploadMiddleware.single("picture"),
  adminController.addMenu
);
router.get(
  "/getOrdersDetail",
  authenticateAdmin,
  adminController.getOrdersDetail
);
router.get("/menu", authenticateAdmin, adminController.getAllMenu);
router.get("/orders", authenticateAdmin, adminController.adminCheckOrders);
router.put(
  "/editMenu/:id",
  uploadMiddleware.single("picture"),
  authenticateAdmin,
  adminController.editMenu
);
router.delete("/deleteMenu/:id", authenticateAdmin, adminController.deleteMenu);

module.exports = router;

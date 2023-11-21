const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/upload");
const adminController = require("../controllers/admin-controller");

router.post(
  "/add",
  uploadMiddleware.single("picture"),
  adminController.addMenu
);
router.get("/getOrdersDetail", adminController.getOrdersDetail);
router.get("/menu", adminController.getAllMenu);
router.get("/orders", adminController.adminCheckOrders);
router.put(
  "/editMenu/:id",
  uploadMiddleware.single("picture"),
  adminController.editMenu
);
router.delete("/deleteMenu/:id", adminController.deleteMenu);

module.exports = router;

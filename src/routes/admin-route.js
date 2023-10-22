const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");

router.post("/add", adminController.addMenu);
router.get("/menu", adminController.getAllMenu);
router.get("/orders", adminController.adminCheckOrders);
router.put("/editMenu", adminController.editMenu);
router.delete("/delete", adminController.deleteMenu);

module.exports = router;
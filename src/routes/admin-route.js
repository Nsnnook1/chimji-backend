const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");

router.post("/add", adminController.addMenu);
router.get("/menu", adminController.getAllMenu);
router.put("/edit", adminController.editMenu);
router.get("/delete", adminController.deleteMenu);
router.get("/orders", adminController.adminCheckOrders);

module.exports = router;
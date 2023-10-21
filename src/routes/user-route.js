const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/cart", userController.addToCart);
router.delete("/deleteItem", userController.deleteCart);


module.exports = router;

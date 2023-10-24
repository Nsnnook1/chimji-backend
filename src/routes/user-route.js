const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const uploadMiddleware = require("../middleware/upload");

router.get("/getCart", userController.getCart);
router.post("/cart", authenticateMiddleware, userController.addToCart);
router.delete("/deleteCart", userController.deleteCart);
// router.put("/payment/:id", uploadMiddleware.single(""),userController.payment)

module.exports = router;

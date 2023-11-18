const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const uploadMiddleware = require("../middleware/upload");

router.get("/getCart/:id", userController.getCart);
router.post("/cart", authenticateMiddleware, userController.addToCart);
router.post(
  "/incQuantity/:id",
  authenticateMiddleware,
  userController.incQuantity
);
router.post(
  "/descQuantity/:id",
  authenticateMiddleware,
  userController.descQuantity
);
router.delete("/deleteCart", userController.deleteCart);
// router.put("/payment/:id", uploadMiddleware.single(""),userController.payment)

module.exports = router;

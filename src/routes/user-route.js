const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const uploadMiddleware = require("../middleware/upload");

router.post(
  "/addSlip/:ordersId",
  authenticateMiddleware,
  uploadMiddleware.single("picture"),
  userController.addSlip
);
router.post(
  "/createOrders",
  authenticateMiddleware,
  uploadMiddleware.single("picture"),
  userController.createOrders
);

router.get("/getCart", authenticateMiddleware, userController.getCart);
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
router.delete("/deleteCart/:id", userController.deleteCart);
// router.put("/payment/:id", uploadMiddleware.single(""),userController.payment)

module.exports = router;

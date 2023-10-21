const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();
const authenticateMiddleware = require("../middleware/authenticate");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get(
  "/checkAuthUser",
  authenticateMiddleware,
  authController.CheckAuthUser
);

module.exports = router;

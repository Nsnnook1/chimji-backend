require("dotenv").config();
const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

module.exports = async (req, res, next) => {
  try {
    const authenticateAdmin = req.headers.authorization;
    if (!authenticateAdmin || !authenticateAdmin.startsWith("Bearer ")) {
      return next(createError("unauthenticatedAdmin", 401));
    }

    const token = authenticateAdmin.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "lkjhgfdsamnbvcxzpoiuytrewq"
    );

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
        role: "admin",
      },
    });

    console.log(user, "user");

    if (!user || user.role !== "admin") {
      return next(createError("unauthenticated", 401));
    }

    next();
  } catch (error) {
    console.error(error);
    return next(createError("unauthenticated", 401));
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { value, err } = registerSchema.validate(req.body);
    if (err) {
      return next(err);
    }
    console.log(value);

    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "lkjhgfdsamnbvcxzpoiuytrewq",
      {
        expiresIn: process.env.JWT_EXP,
      }
    );
    delete user.password;
    delete user.role;

    res.status(201).json({ accessToken, user });
    console.log(value);
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { value, err } = loginSchema.validate(req.body);
    if (err) {
      return next(err);
    }
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: value.email }, { mobile: value.mobile }],
      },
    });
    if (!user) {
      return next(createErr("invalid credential"), 400);
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createErr("invalid credential"), 400); //ใส่ค่าเหมือนกัน เพื่อให้คนอ่นไม่รู้ว่า err ที่ตรงไหน
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "lkjhgfdsamnbvcxzpoiuytrewq",
      {
        expiresIn: process.env.JWT_EXP,
      }
    );
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
const bcrypt = require("bcryptjs");

const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const { creatToken } = require("../utils/jwt");
const createErr = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const { value, err } = registerSchema.validate(req.body);
    if (err) {
      return next(err);
    }

    value.password = await bcrypt.hash(value.password, 12);
    const data = {
      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,
      mobile: value.mobile,
      password: value.password,
      role: value.role,
      Address: {
        create: {
          address_name: value.address_name,
          district: value.district,
          subDistrict: value.subDistrict,
          province: value.province,
          postCode: Number(value.postCode),
        },
      },
    };

    const user = await prisma.user.create({
      data,
    });
    const payload = { userId: user.id };
    //! fn createToken
    const accessToken = creatToken(payload);
    delete user.password;
    delete user.role;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    console.log(err);
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
      where: { email: value.email },
    });

    if (!user) {
      return next(createErr("invalid credential"), 400); //ใส่ค่าเหมือนกัน เพื่อให้คนอ่านไม่รู้ว่า error ที่ตรงไหน
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createErr("invalid credential"), 400); //ใส่ค่าเหมือนกัน เพื่อให้คนอ่านไม่รู้ว่า error ที่ตรงไหน
    }

    const payload = { userId: user.id };
    const accessToken = creatToken(payload);
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.CheckAuthUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

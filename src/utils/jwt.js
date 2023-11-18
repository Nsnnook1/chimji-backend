const jwt = require("jsonwebtoken");

exports.creatToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY || "lkjhgfdsamnbvcxzpoiuytrewq",
    {
      expiresIn: process.env.JWT_EXP,
    }
  );
};

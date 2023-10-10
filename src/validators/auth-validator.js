const Joi = require("joi");

const registerSchema = Joi.object({
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),

  email: Joi.string().email().required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/) //^ = ขึ้นต้นด้วย 0-9, มี10ตัว
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .trim()
    .required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
exports.loginSchema = loginSchema;

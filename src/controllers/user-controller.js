const prisma = require("../models/prisma");

exports.addToCart = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);
    const cart = await prisma.cart.create({
      data: {
        name: value.name,
        price: +value.price,
        quantity: +value.quantity,
        menusId: +value.menusId,
      },
    });
    res.status(200).json({ msg: "Add Success", cart });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const value = req.body;
    const deleteCart = await prisma.cart.delete({
      where: {
        id: value.id,
      },
    });
    res.status(200).json({ msg: "Delete Success", deleteCart });
  } catch (err) {
    next(err);
  }
};
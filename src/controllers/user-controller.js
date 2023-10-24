const prisma = require("../models/prisma");

exports.getCart = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(id);
    const cart = await prisma.cart.findMany({
      where: { id: +value.id },
    });
    console.log(cart);

    res.status(200).json({ msg: "Get Cart SuccessFully", cart });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);

    const cart = await prisma.cart.create({
      data: {
        name: value.name,
        price: +value.price,
        menuId: value.id,
        userId: req.user.id,
      },
    });
    res.status(200).json({ msg: "Add Success", cart });
  } catch (err) {
    next(err);
    console.log(err);
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

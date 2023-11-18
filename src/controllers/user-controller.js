const prisma = require("../models/prisma");

exports.getCart = async (req, res, next) => {
  // const value = req.body; //! get don't have req.body
  const value = req.params;
  console.log(req.params);
  try {
    const cart = await prisma.cart.findMany({
      where: { userId: +value.id },
      include: { menu: true },
    });
    console.log(cart);

    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const value = req.body;

    //! find duplicate item in cart
    const findItem = await prisma.cart.findFirst({
      where: { menuId: value.id },
    });

    if (findItem) {
      await prisma.cart.update({
        where: { id: findItem.id },
        data: { quantity: findItem.quantity + 1 },
      });
    } else {
      await prisma.cart.create({
        data: {
          name: value.name,
          price: +value.price,
          menuId: value.id,
          userId: req.user.id,
          quantity: 1,
        },
      });
    }

    res.status(200).json({ msg: "Add Success" });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.incQuantity = async (req, res, next) => {
  const value = req.params;
  try {
    const findItem = await prisma.cart.findFirst({
      where: { id: +value.id },
    });
    if (findItem) {
      const { quantity, id } = findItem;
      await prisma.cart.update({
        where: { id },
        data: { quantity: quantity + 1 },
      });
    }
    res.status(200).json({ msg: "Increase Quantity" });
  } catch (err) {
    next(err);
  }
};
exports.descQuantity = async (req, res, next) => {
  const value = req.params;
  try {
    const findItem = await prisma.cart.findFirst({
      where: { id: +value.id },
    });
    if (findItem) {
      const { quantity, id } = findItem;
      if (quantity === 1) {
        await prisma.cart.delete({ where: { id } });
      } else {
        await prisma.cart.update({
          where: { id },
          data: { quantity: quantity - 1 },
        });
      }
    }
    res.status(200).json({ msg: "Increase Quantity" });
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

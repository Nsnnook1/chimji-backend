const { upload } = require("../utils/cloudinary-service");
const { valid } = require("joi");
const prisma = require("../models/prisma");

exports.getCart = async (req, res, next) => {
  // const value = req.body; //! get don't have req.body
  try {
    const userId = +req.user.id;
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { menu: true },
    });

    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.createOrders = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findMany({
      where: { userId: +req.user.id },
      include: { menu: true },
    });
    let path = null;
    if (req.file) {
      path = await upload(req.file.path);
    }

    const orders = await prisma.orders.create({
      data: {
        userId: +req.user.id,
        payment: path,
        total_price: 200,
      },
    });

    const data = cart.map((x) => {
      return { ordersId: orders.id, quantity: x.quantity, menuId: x.menu.id };
    });
    
    await prisma.orderDetails.createMany({
      data: data,
    });

    await prisma.cart.deleteMany({
      where: {
        userId: +req.user.id,
      },
    });
    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.addSlip = async (req, res, next) => {
  try {
    const ordersId = req.params;
    let path = null;
    if (req.file) {
      path = await upload(req.file.path);
    }
    await prisma.orders.create({
      where: {
        id: +ordersId,
        userId: +req.user.id,
      },
      data: {
        payment: path || "",
      },
    });
    res.status(200).json({ msg: "Add menu successfully!!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const value = req.body;
    //! find duplicate item in cart
    const findItem = await prisma.cart.findFirst({
      where: { menuId: +value.id, userId: req.user.id },
    });
    if (findItem) {
      await prisma.cart.update({
        where: { id: +findItem.id },
        data: { quantity: findItem.quantity + 1 },
      });
    } else {
      await prisma.cart.create({
        data: {
          name: value.name,
          price: +value.price,
          menuId: +value.id,
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
    const value = req.params;
    await prisma.cart.delete({
      where: {
        id: +value.id,
      },
    });
    res.status(200).json({ msg: "Delete Success" });
  } catch (err) {
    next(err);
  }
};

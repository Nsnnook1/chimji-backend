const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-service");

exports.addMenu = async (req, res, next) => {
  try {
    const value = req.body;
    if (req.file) {
      value.picture = await upload(req.file.path);
    }
    const menu = await prisma.menu.create({
      data: {
        name: value.name,
        detail: value.detail,
        price: +value.price,
        picture: value.picture,
      },
    });
    res.status(200).json({ msg: "Add menu successfully!!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllMenu = async (req, res, next) => {
  try {
    const foundMenu = await prisma.menu.findMany();
    res.status(200).json({ msg: "Get menu SuccessFully", foundMenu });
  } catch (err) {
    next(err);
  }
};

exports.editMenu = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.params.id);
    const value = req.body;
    console.log(value.id);

    if (req.file) {
      value.picture = await upload(req.file.path);
    }
    const updatedMenu = await prisma.menu.update({
      where: {
        id: +id,
      },
      data: {
        name: value.name,
        detail: value.detail,
        price: +value.price,
        picture: value.picture,
      },
    });
    res.status(200).json({ msg: "Edit Success", updatedMenu });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteMenu = async (req, res, next) => {
  try {
    const value = req.params;
    console.log(value);

    const carts = await prisma.cart.findMany({
      where: {
        menuId: value.id,
      },
    });

    if (carts.length > 0) {
      const deleteCartByMenuId = await prisma.cart.delete({
        where: {
          menuId: value.id,
        }
      })

      const deleteMenu = await prisma.menu.delete({
        where: {
          id: +value.id,
        },
      });
    } else {
      const deleteMenu = await prisma.menu.delete({
        where: {
          id: +value.id,
        },
      });
    }

    res.status(200).json({ msg: "Delete Success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.adminCheckOrders = async (req, res, next) => {
  try {
    const checkUserOrders = await prisma.orderDetails.findMany();
    res.status(200).json({ msg: "Found orders successfully", checkUserOrders });
  } catch (err) {
    next(err);
  }
};

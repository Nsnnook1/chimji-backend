const prisma = require("../models/prisma");

exports.addMenu = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);
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

exports.editMenu = async (req,res,next) => {
  try {
    const value = req.body;
    const updatedMenu = await prisma.menu.update({
      where: {
        id: +value.id,
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
    next(err)
  }
}

exports.deleteMenu = async (req, res, next) => {
  try {
    const value = req.body;
    const deleteMenu = await prisma.menu.delete({
      where: {
        id: +value.id,
      },
    });
    res.status(200).json({ msg: "Delete Success" });
  } catch (err) {
    next(err);
  }
};

exports.adminCheckOrders = async (req, res, next) => {
  try {
    const checkUserOrders = await prisma.orderDetails.findMany();
    res
      .status(200)
      .json({ msg: "Found orders successfully", checkUserOrders });
  } catch (err) {
    next(err);
  }
};
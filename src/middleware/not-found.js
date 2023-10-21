module.exports = (req, res, next) => {
  return res.status(404).json({ msg: "resource not found on this server" });
};

const { User, Cart, Seller } = require("../models");
const { verifyToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) return next(new Error("unauthorized"));

    const verify = verifyToken(access_token);

    const checkUser = await User.findByPk(verify.id);

    if (!checkUser) return next(new Error("unauthorized"));

    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};

const authorizeSeller = async (req, res, next) => {
  try {
    const { id } = req.user;

    const checkSeller = await Seller.findOne({
      where: {
        UserId: id,
      },
    });

    if (!checkSeller)
      return next(new Error("Anda belum terdaftar sebagai seller"));

    req.seller = checkSeller;

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeCart = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: cartId } = req.params;

    const checkCart = await Cart.findOne({
      where: {
        id: cartId,
      },
    });

    if (!checkCart) return next(new Error("Cart tidak di temukan"));

    if (checkCart.UserId !== id) return next(new Error("forbidden"));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, authorizeCart, authorizeSeller };

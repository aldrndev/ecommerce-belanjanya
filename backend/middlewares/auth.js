const { User, Cart, Seller, Product } = require("../models");
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

const authorizeAddCart = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const checkProduct = await Product.findOne({
      where: {
        id: productId,
      },
      include: Seller,
    });

    if (!checkProduct) return next(new Error("Product tidak di temukan"));

    if (checkProduct.Seller.UserId === id)
      return next(
        new Error("Tidak dapat menambahkan produk sendiri ke keranjang")
      );

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, authorizeAddCart, authorizeSeller };

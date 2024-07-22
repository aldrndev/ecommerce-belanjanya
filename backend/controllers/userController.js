const { generateOTP, sendEmail } = require("../helpers/helper");
const { Profile, Order, Wishlist, Discussion, Cart } = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const { createOtp, verifyToken } = require("../utils/jwt");

class UserController {
  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;

      const checkProfile = await Profile.findOne({
        where: {
          UserId: id,
        },
        include: User,
      });

      if (!checkProfile) return next(new Error("Akun anda belum terdaftar"));

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data profile",
        data: checkProfile,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getOrders(req, res, next) {
    try {
      const { id } = req.user;
      const orders = await Order.findAll({
        where: {
          UserId: id,
        },
        include: {
          all: true,
          nested: true,
        },
      });

      if (orders.length === 0) {
        res.status(200).json({
          statusCode: 200,
          message: "Belum ada order",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data order",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getWishlist(req, res, next) {
    try {
      const { id } = req.user;

      const wishlists = await Wishlist.findAll({
        where: {
          UserId: id,
        },
        include: {
          all: true,
        },
      });

      if (wishlists.length === 0) {
        res.status(200).json({
          statusCode: 200,
          message: "Belum ada wishlist",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data wishlist",
        data: wishlists,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getChat(req, res, next) {
    try {
      const { id } = req.user;

      const chats = await conversation.findAll({
        where: {
          UserId: id,
        },
        include: {
          all: true,
          nested: true,
        },
      });

      if (chats.length === 0) {
        res.status(200).json({
          statusCode: 200,
          message: "Belum ada chat",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data chat",
        data: chats,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getDiscussion(req, res, next) {
    try {
      const { id } = req.user;

      const discussions = await Discussion.findAll({
        where: {
          UserId: id,
        },
        include: {
          all: true,
          nested: true,
        },
      });

      if (discussions.length === 0) {
        res.status(200).json({
          statusCode: 200,
          message: "Belum ada diskusi",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data diskusi",
        data: discussions,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getReview(req, res, next) {
    try {
      const { id } = req.user;

      const reviews = await Review.findAll({
        where: {
          UserId: id,
        },
        include: {
          all: true,
          nested: true,
        },
      });

      if (reviews.length === 0) {
        res.status(200).json({
          statusCode: 200,
          message: "Belum ada review",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data review",
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateProfile(req, res, next) {
    try {
      const { name, phone, address } = req.body;

      const update = await Profile.update({
        name,
        phone,
        address,
        image: req.file ? req.file.path : "public/uploads/images/default.png",
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengupdate profile",
        data: update,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updatePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, newConfirmPassword } = req.body;

      const { id } = req.user;

      const checkUser = User.findByPk(id);

      if (!comparePassword(oldPassword, checkUser.password))
        return next(new Error("Password lama tidak sesuai"));

      if (newPassword !== newConfirmPassword)
        return next(new Error("Konfirmasi password tidak sesuai"));

      await User.update(
        {
          password: newPassword,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengupdate password",
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateEmail(req, res, next) {
    try {
      const { oldEmail, newEmail } = req.body;
      const { id } = req.user;

      const checkUser = await User.findByPk(id);

      if (checkUser.email !== oldEmail)
        return next(new Error("Email lama tidak sesuai"));

      const newOtp = generateOTP();
      const payload = {
        email: checkUser.email,
        newOtp,
      };

      const tokenOtp = createOtp(payload);
      await sendEmail(newEmail, newOtp);

      res.status(201).json({
        statusCode: 201,
        message: "Silahkan cek email anda untuk verifikasi OTP",
        tokenOtp,
      });
    } catch (error) {
      next(error);
    }
  }
  static async verifyEmail(req, res, next) {
    try {
      const { token, otp } = req.body;

      const decoded = verifyToken(token);

      if (decoded.newOtp !== otp)
        return next(new Error("Kode OTP yang kamu masukan salah"));

      await User.update(
        {
          email: decoded.email,
        },
        {
          where: {
            email: decoded.email,
          },
        }
      );
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengupdate email",
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateCart(req, res, next) {
    try {
      const { note, quantity } = req.body;
      const { id } = req.params;

      const update = await Cart.update(
        {
          note,
          quantity,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengupdate keranjang",
        data: update,
      });
    } catch (error) {
      next(error);
    }
  }
  static async removeCart(req, res, next) {
    try {
      const { id } = req.params;

      await Cart.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses menghapus keranjang",
      });
    } catch (error) {
      next(error);
    }
  }
  static async removeWishlist(req, res, next) {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;

      const findWishlist = await Wishlist.findByPk(id);

      if (findWishlist.UserId !== UserId)
        return next(new Error("Wishlist ini bukan milik anda"));

      await Wishlist.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses menghapus wishlist",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

const { Op } = require("sequelize");
const { generateOTP, sendEmail } = require("../helpers/helper");
const {
  Profile,
  Order,
  Wishlist,
  Discussion,
  Cart,
  Product,
  User,
  ProductImage,
  Seller,
  Review,
  Checkout,
  Shipment,
  sequelize,
} = require("../models");
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
        include: [
          {
            model: Checkout,
            include: [
              {
                model: Cart,
                include: [
                  {
                    model: Product,
                  },
                ],
              },
            ],
          },
          {
            model: Shipment,
          },
          {
            model: Seller,
          },
        ],
      });

      const newOder = await Promise.all(
        orders.map(async (item) => {
          const findImage = await ProductImage.findAll({
            where: {
              ProductId: item.Checkout.Cart.ProductId,
            },
          });

          const product = item.toJSON();
          const images = findImage.filter(
            (image) => image.ProductId === item.Checkout.Cart.ProductId
          );
          product.Checkout.Cart.Product.Images = images;
          return product;
        })
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data order",
        data: newOder,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addOrder(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { id: userId } = req.user;

      const { checkoutId, totalPrice, shipmentId, courier } = req.body;

      const checkouts = await Checkout.findAll(
        {
          where: {
            UserId: userId,
            id: {
              [Op.in]: checkoutId,
            },
          },
          include: {
            model: Cart,
            include: {
              model: Product,
              include: Seller,
            },
          },
        },
        {
          transaction,
        }
      );

      const orders = checkouts.map((item) => {
        const sellerId = item.Cart.Product.Seller.id;
        const selectedCourier = courier[sellerId];

        return {
          CheckoutId: item.id,
          UserId: userId,
          status: 1,
          totalPrice,
          courier: selectedCourier,
          SellerId: sellerId,
          ShipmentId: shipmentId,
          PromoId: null,
        };
      });

      const order = await Order.bulkCreate(orders, { transaction });

      const cartId = checkouts.map((item) => item.CartId);

      await Checkout.update(
        {
          isActive: false,
        },
        {
          where: {
            UserId: userId,
            id: {
              [Op.in]: checkoutId,
            },
          },
        },
        {
          transaction,
        }
      );

      await Cart.update(
        {
          isActive: false,
        },
        {
          where: {
            UserId: userId,
            id: {
              [Op.in]: cartId,
            },
          },
        },
        {
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).json({
        statusCode: 201,
        message: "Persanan kamu berhasil di terima",
        data: order,
      });
    } catch (error) {
      await transaction.rollback();
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
        include: Product,
      });

      if (wishlists.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada wishlist",
          data: [],
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
  static async addWishlist(req, res, next) {
    try {
      const { productId } = req.body;
      const { id } = req.user;

      const checkWishlist = await Wishlist.findOne({
        where: {
          UserId: id,
          ProductId: productId,
        },
      });

      if (checkWishlist) return next(new Error("Produk sudah ada di wishlist"));

      const wishlist = await Wishlist.create({
        UserId: id,
        ProductId: productId,
      });

      res.status(200).json({
        statusCode: 201,
        message: "Sukses menambahkan product ke wishlist",
        data: wishlist,
      });
    } catch (error) {
      next(error);
    }
  }
  static async removeWishlist(req, res, next) {
    try {
      const { productId } = req.body;
      const { id } = req.user;

      await Wishlist.destroy({
        where: {
          UserId: id,
          ProductId: productId,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses menghapus product dari wishlist",
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
      const { oldPassword, newPassword } = req.body;

      const { id } = req.user;

      const checkUser = User.findByPk(id);

      if (!comparePassword(oldPassword, checkUser.password))
        return next(new Error("Password lama tidak sesuai"));

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
        email: newEmail,
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
        message: "Sukses mengubah email",
      });
    } catch (error) {
      next(error);
    }
  }
  static async addCart(req, res, next) {
    try {
      const { id } = req.user;
      const { productId, quantity, note } = req.body;

      const checkCart = await Cart.findOne({
        where: {
          ProductId: productId,
          UserId: id,
        },
      });

      if (checkCart && !checkCart.isActive) {
        checkCart.quantity = quantity;
        checkCart.note = note;
        checkCart.isActive = true;
        await checkCart.save();
        return res.status(200).json({
          statusCode: 200,
          message: "Sukses menambahkan produk ke keranjang",
          data: checkCart,
        });
      } else if (checkCart && checkCart.isActive) {
        checkCart.quantity += quantity;
        checkCart.note = note;
        await checkCart.save();
        return res.status(200).json({
          statusCode: 200,
          message: "Sukses menambahkan produk ke keranjang",
          data: checkCart,
        });
      }

      const cart = await Cart.create({
        ProductId: productId,
        UserId: id,
        quantity,
        note,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Sukses menambahkan produk ke keranjang",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCart(req, res, next) {
    try {
      const { id } = req.user;

      const cart = await Cart.findAll({
        where: {
          UserId: id,
          isActive: true,
        },
        include: [
          {
            model: Product,
            include: Seller,
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      if (cart.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada keranjang",
          data: [],
        });
      }

      const newCart = await Promise.all(
        cart.map(async (item) => {
          const findImage = await ProductImage.findAll({
            where: {
              ProductId: item.ProductId,
            },
          });

          const product = item.toJSON();
          const images = findImage.filter(
            (image) => image.ProductId === item.ProductId
          );
          product.Product.Images = images;
          return product;
        })
      );

      const groupedCartItems = newCart.reduce((acc, item) => {
        const sellerId = item.Product.Seller.id;
        const sellerName = item.Product.Seller.name;

        let sellerGroup = acc.find((group) => group.sellerId === sellerId);

        if (!sellerGroup) {
          sellerGroup = {
            sellerId,
            sellerName,
            products: [],
          };
          acc.push(sellerGroup);
        }

        sellerGroup.products.push(item);
        return acc;
      }, []);

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data keranjang",
        data: groupedCartItems,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateCart(req, res, next) {
    try {
      const { note, quantity, productId } = req.body;
      const { id } = req.user;

      const update = await Cart.update(
        {
          quantity,
          note,
        },
        {
          where: {
            UserId: id,
            ProductId: productId,
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
      const { id } = req.user;
      const { cartId } = req.body;

      await Cart.destroy({
        where: {
          UserId: id,
          id: cartId,
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

  static async bulkRemoveCart(req, res, next) {
    try {
      const { cartId } = req.body;
      const { id } = req.user;

      await Cart.destroy({
        where: {
          UserId: id,
          id: {
            [Op.in]: cartId,
          },
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses menghapus semua keranjang",
      });
    } catch (error) {
      next(error);
    }
  }

  static async addCheckout(req, res, next) {
    try {
      const { cartId } = req.body;
      const { id } = req.user;

      const checkCheckout = await Checkout.findAll({
        where: {
          UserId: id,
          isActive: true,
        },
      });

      if (checkCheckout.length > 0) {
        await Checkout.update(
          {
            isActive: false,
          },
          {
            where: {
              UserId: id,
            },
          }
        );
      }

      const checkout = await Checkout.bulkCreate(
        cartId.map((cart) => ({
          CartId: cart,
          UserId: id,
        }))
      );

      res.status(201).json({
        statusCode: 201,
        message: "Sukses menambahkan product ke checkout",
        data: checkout,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCheckout(req, res, next) {
    try {
      const { id } = req.user;

      const checkouts = await Checkout.findAll({
        where: {
          UserId: id,
          isActive: true,
        },
        include: {
          model: Cart,
          include: {
            model: Product,
            include: {
              model: Seller,
            },
          },
        },
        order: [["CartId", "ASC"]],
      });

      if (checkouts.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada checkout",
          data: [],
        });
      }

      const newCheckout = await Promise.all(
        checkouts.map(async (item) => {
          const findImage = await ProductImage.findAll({
            where: {
              ProductId: item.Cart.ProductId,
            },
          });

          const product = item.toJSON();
          const images = findImage.filter(
            (image) => image.ProductId === item.Cart.ProductId
          );
          product.Cart.Product.Images = images;
          return product;
        })
      );

      const groupedCartItems = newCheckout.reduce((acc, item) => {
        const sellerId = item.Cart.Product.Seller.id;
        const sellerName = item.Cart.Product.Seller.name;

        let sellerGroup = acc.find((group) => group.sellerId === sellerId);

        if (!sellerGroup) {
          sellerGroup = {
            sellerId,
            sellerName,
            carts: [],
          };
          acc.push(sellerGroup);
        }

        sellerGroup.carts.push(item);
        return acc;
      }, []);

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data checkout",
        data: groupedCartItems,
        beforeGroup: newCheckout,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addShipmentInfo(req, res, next) {
    try {
      const { receiver, phone, address } = req.body;
      const { id } = req.user;

      const checkShipment = await Shipment.findOne({
        where: {
          UserId: id,
        },
      });

      if (checkShipment) {
        checkShipment.receiver = receiver;
        checkShipment.phone = phone;
        checkShipment.address = address;
        await checkShipment.save();
        return res.status(200).json({
          statusCode: 200,
          message: "Sukses mengubah informasi pengiriman",
          data: checkShipment,
        });
      }

      const shipment = await Shipment.create({
        receiver,
        phone,
        address,
        UserId: id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Sukses mengubah informasi pengiriman",
        data: shipment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getShipmentInfo(req, res, next) {
    try {
      const { id } = req.user;

      const shipment = await Shipment.findOne({
        where: {
          UserId: id,
        },
      });

      if (!shipment) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada informasi pengiriman",
          data: false,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil informasi pengiriman",
        data: shipment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addConversation(req, res, next) {
    try {
      const { id } = req.user;
      const { sellerId } = req.body;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

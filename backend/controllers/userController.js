const { Op } = require("sequelize");
const { generateOTP, sendEmail } = require("../helpers/helper");
const {
  Profile,
  Order,
  Wishlist,
  Discussion,
  DiscussionMessage,
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
      const { page, title, date } = req.query;

      const searchByTitle = title
        ? { title: { [Op.iLike]: `%${title}%` } }
        : {};

      let sortByDate = {};

      if (date === "7") {
        sortByDate = {
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
        };
      } else if (date === "30") {
        sortByDate = {
          createdAt: {
            [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
          },
        };
      } else if (date === "90") {
        sortByDate = {
          createdAt: {
            [Op.gte]: new Date(new Date() - 90 * 24 * 60 * 60 * 1000),
          },
        };
      }

      const limit = 5;
      const pageLimit = page ? Number(page) : 1;
      const offset = (pageLimit - 1) * limit;

      const { count, rows } = await Order.findAndCountAll({
        where: {
          UserId: id,
          ...sortByDate,
        },
        include: [
          {
            model: Checkout,
            required: true,
            include: [
              {
                model: Cart,
                required: true,
                include: [
                  {
                    model: Product,
                    required: true,
                    where: {
                      ...searchByTitle,
                    },
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
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      if (count === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada order",
          data: [],
        });
      }

      const newOrder = await Promise.all(
        rows.map(async (item) => {
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

      const groupedOrder = newOrder.reduce((acc, item) => {
        const sellerId = item.SellerId;
        const sellerName = item.Seller.name;
        const invoice = item.invoiceNo;
        const courier = item.courier;
        const shipmentFee = item.shipmentFee;
        const totalPrice = item.totalPrice;
        const status = item.status;
        const shipment = item.ShipmentId;
        const orderDate = item.createdAt;
        const confirmedDate = item.confirmedDate;
        const prossessedDate = item.prossessedDate;
        const deliveredAt = item.deliveredAt;
        const completedAt = item.completedAt;
        const canceledAt = item.canceledAt;

        let invoiceGroup = acc.find((group) => group.invoiceNo === invoice);

        if (!invoiceGroup) {
          invoiceGroup = {
            sellerId,
            sellerName,
            invoiceNo: invoice,
            courier,
            shipmentFee,
            totalPrice,
            status,
            shipmentId: shipment,
            orderDate,
            confirmedDate,
            prossessedDate,
            deliveredAt,
            completedAt,
            canceledAt,
            products: [],
          };
          acc.push(invoiceGroup);
        }

        invoiceGroup.products.push(item);
        return acc;
      }, []);

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data order",
        data: groupedOrder,
        pagination: {
          currentPage: pageLimit,
          totalPage: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  static async addOrder(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { id: userId } = req.user;

      const { checkoutId, totalPrice, shipmentId, courier, shipmentFee } =
        req.body;

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

      let invoice = {};

      const orders = checkouts.map((item) => {
        const sellerId = item.Cart.Product.Seller.id;
        const selectedCourier = courier[sellerId];
        const shipment = shipmentFee[sellerId];
        const price = totalPrice[sellerId];

        if (!invoice[sellerId]) {
          invoice[sellerId] = `INV/${new Date().getFullYear()}${String(
            new Date().getMonth() + 1
          ).padStart(2, "0")}${String(new Date().getDate()).padStart(
            2,
            "0"
          )}/BLJ/${String(new Date().getHours()).padStart(2, "0")}${String(
            new Date().getMinutes()
          ).padStart(2, "0")}${String(new Date().getSeconds()).padStart(
            2,
            "0"
          )}${new Date().getMilliseconds() * sellerId * userId}`;
        }

        return {
          CheckoutId: item.id,
          UserId: userId,
          status: 1,
          totalPrice: price,
          courier: selectedCourier,
          shipmentFee: shipment,
          invoiceNo: invoice[sellerId],
          SellerId: sellerId,
          ShipmentId: shipmentId,
          PromoId: null,
          confirmedAt: null,
          prossessedAt: null,
          deliveredAt: null,
          completedAt: null,
          canceledAt: null,
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
      console.log(error);
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
          model: Product,
          include: {
            model: Seller,
          },
        },
      });

      if (wishlists.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada wishlist",
          data: [],
        });
      }

      const newWishlist = await Promise.all(
        wishlists.map(async (item) => {
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
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data wishlist",
        data: newWishlist,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getWishlistWithPagination(req, res, next) {
    try {
      const { id } = req.user;
      const { page } = req.query;

      const limit = 9;
      const pageLimit = page ? Number(page) : 1;
      const offset = (pageLimit - 1) * limit;

      const { count, rows } = await Wishlist.findAndCountAll({
        where: {
          UserId: id,
        },
        include: {
          model: Product,
          include: {
            model: Seller,
          },
        },
        limit,
        offset,
      });

      if (count === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada wishlist",
          data: [],
        });
      }

      const newWishlist = await Promise.all(
        rows.map(async (item) => {
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
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data wishlist",
        data: newWishlist,
        pagination: {
          currentPage: pageLimit,
          totalPage: Math.ceil(count / limit),
        },
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
          model: Product,
          include: {
            model: Seller,
          },
        },
      });

      if (discussions.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada diskusi",
          data: [],
        });
      }

      const profile = await Profile.findOne({
        where: {
          UserId: id,
        },
      });

      const seller = await Seller.findOne({
        where: {
          UserId: id,
        },
      });

      const discussionMsg = await DiscussionMessage.findAll({
        where: {
          SenderId: id,
        },
        include: {
          model: Discussion,
          include: {
            model: Product,
            include: {
              model: Seller,
            },
          },
        },
      });

      const groupedDiscussion = discussions.map((discussion) => {
        const messages = discussionMsg.filter(
          (msg) => msg.DiscussionId === discussion.id
        );

        if (discussion.Product.Seller.id === seller.id) {
          return {
            ...discussion.toJSON(),
            messages,
            seller,
          };
        } else {
          return {
            ...discussion.toJSON(),
            messages,
            profile,
          };
        }
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data diskusi",
        data: groupedDiscussion,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addDiscussion(req, res, next) {
    try {
      const { id } = req.user;
      const { productId, contentNew, contentReply, discussionId } = req.body;

      const seller = await Seller.findOne({
        where: {
          UserId: id,
        },
      });

      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });

      const getDiscussion = await Discussion.findOne({
        where: {
          ProductId: productId,
          id: discussionId ? discussionId : null,
        },
      });

      let getDiscussionMsg = null;

      if (getDiscussion) {
        getDiscussionMsg = await DiscussionMessage.findAll({
          where: {
            DiscussionId: getDiscussion.id,
          },
        });
      }

      if (!getDiscussion && product.SellerId === seller?.id) {
        return next(
          new Error("Penjual tidak bisa membuat diskusi di produknya miliknya")
        );
      } else if (getDiscussion && product.SellerId === seller?.id) {
        const discussionMessage = await DiscussionMessage.create({
          DiscussionId: getDiscussion.id,
          UserId: id,
          content: contentReply,
          isReply: getDiscussionMsg?.length > 1 ? true : false,
          isSeller: true,
        });

        return res.status(200).json({
          statusCode: 201,
          message: "Sukses menambahkan diskusi",
          data: { getDiscussion, discussionMessage },
        });
      }

      if (!getDiscussion) {
        const discussion = await Discussion.create({
          ProductId: productId,
          UserId: id,
        });
        const discussionMessage = await DiscussionMessage.create({
          DiscussionId: discussion.id,
          UserId: id,
          content: contentNew,
          isReply: getDiscussionMsg?.length >= 1 ? true : false,
          isSeller: false,
        });

        res.status(200).json({
          statusCode: 201,
          message: "Sukses menambahkan diskusi",
          data: { discussion, discussionMessage },
        });
      } else {
        const discussionMessage = await DiscussionMessage.create({
          DiscussionId: getDiscussion.id,
          UserId: id,
          content: contentReply,
          isReply: getDiscussionMsg?.length >= 1 ? true : false,
          isSeller: false,
        });

        res.status(200).json({
          statusCode: 201,
          message: "Sukses menambahkan diskusi",
          data: {
            discussion: getDiscussion,
            discussionMessage,
          },
        });
      }
    } catch (error) {
      console.log(error);
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
      const { productId, quantity, note, isDirect } = req.body;

      const checkCart = await Cart.findOne({
        where: {
          ProductId: productId,
          UserId: id,
        },
      });

      const checkProduct = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (quantity > checkProduct.stock)
        return next(
          new Error(
            `Jumlah pesanan melebihi stok product, stok tersedia ${checkProduct.stock}`
          )
        );

      if (checkCart && !checkCart.isActive) {
        checkCart.quantity = quantity;
        checkCart.note = note;
        checkCart.isActive = isDirect ? false : true;
        await checkCart.save();
        return res.status(200).json({
          statusCode: 200,
          message: "Sukses menambahkan produk ke keranjang",
          data: checkCart,
        });
      } else if (checkCart && checkCart.isActive) {
        checkCart.quantity += quantity;
        checkCart.note = note;
        checkCart.isActive = isDirect ? false : true;
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
        isActive: isDirect ? false : true,
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
      next(error);
    }
  }
  static async updateCart(req, res, next) {
    try {
      const { note, quantity, productId } = req.body;
      const { id } = req.user;

      const checkProduct = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (quantity > checkProduct.stock)
        return next(
          new Error(
            `Jumlah pesanan melebihi stok product, stok tersedia ${checkProduct.stock}`
          )
        );

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

      const carts = await Checkout.findAll({
        where: {
          CartId: cartId,
          isActive: true,
        },
      });

      if (carts.length > 0) {
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

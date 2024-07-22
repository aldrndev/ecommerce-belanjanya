const { sequelize, Seller, User, ProductImage, Product } = require("../models");

class SellerController {
  static async register(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.user;
      const {
        name,
        address,
        province,
        city,
        district,
        subDistrict,
        rt,
        rw,
        postalCode,
      } = req.body;

      const checkSeller = await User.findByPk(id);
      if (checkSeller.isSeller)
        return next(new Error("Akun anda sudah menjadi seller"));

      const create = await Seller.create(
        {
          name,
          address,
          province,
          city,
          district,
          subDistrict,
          rt,
          rw,
          postalCode,
          image: req.file ? req.file.path : "public/uploads/images/default.png",
          UserId: id,
        },
        { transaction }
      );

      await User.update(
        {
          isSeller: true,
        },
        { where: { id } },
        { transaction }
      );

      await transaction.commit();

      res.status(201).json({
        statusCode: 201,
        message:
          "Sukses membuat profile seller, Silahkan untuk menambahkan produk anda",
        data: create,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        title,
        price,
        brand,
        CategoryId,
        condition,
        stock,
        weight,
        description,
      } = req.body;
      const { id } = req.seller;

      const productImg = req.files.map((file) => file.path);

      console.log(productImg);

      const create = await Product.create({
        title,
        price,
        brand,
        CategoryId,
        condition,
        stock,
        weight,
        description,
        SellerId: id,
      });

      const createImg = await ProductImage.bulkCreate(
        productImg.map((img) => {
          return {
            ProductId: create.id,
            image: img,
          };
        }),
        { transaction }
      );

      await transaction.commit();

      res.status(201).json({
        statusCode: 201,
        message: "Sukses membuat product",
        data: {
          product: create,
          image: createImg,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SellerController;

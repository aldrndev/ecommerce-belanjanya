const {
  sequelize,
  Seller,
  User,
  ProductImage,
  Product,
  Category,
  SubCategory,
  ChildrenSubCategory,
  ListProduct,
} = require("../models");

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

      const checkSeller = await Seller.findOne({
        where: {
          UserId: id,
        },
      });

      const checkUser = await User.findByPk(id);

      if (checkSeller && checkUser.isSeller)
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
          "Selamat anda terdaftar sebagai seller, silahkan tambahkan produk anda",
        data: create,
        isSeller: true,
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
        ChildrenSubCategoryId,
        condition,
        stock,
        weight,
        description,
      } = req.body;
      const { id } = req.seller;

      const productImg = req.files?.map((file) => file.path);

      const create = await Product.create(
        {
          title,
          price,
          brand,
          condition,
          stock,
          weight,
          description,
          location: req.seller.city,
          SellerId: id,
          ChildrenSubCategoryId,
        },
        { transaction }
      );

      const createImg = await ProductImage.bulkCreate(
        productImg?.map((img) => {
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
        message: `Sukses menambahkan produk ${create.title}`,
        data: {
          Product: create,
          Image: createImg,
        },
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll();

      if (category.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada kategori yang ditemukan",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data kategori",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSubCategory(req, res, next) {
    try {
      const subCategory = await SubCategory.findAll();

      if (subCategory.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada sub kategori yang ditemukan",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data sub kategori",
        data: subCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getChildrenSubCategory(req, res, next) {
    try {
      const childrenSubCategory = await ChildrenSubCategory.findAll();

      if (childrenSubCategory.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada children sub kategori yang ditemukan",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data children sub kategori",
        data: childrenSubCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SellerController;

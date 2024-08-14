const { Op } = require("sequelize");
const {
  Product,
  ChildrenSubCategory,
  SubCategory,
  Category,
  User,
  Seller,
  ProductImage,
} = require("../models");
class PublicController {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [Seller, ChildrenSubCategory],
        order: [["createdAt", "DESC"]],
        limit: 28,
      });

      if (products.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada data product",
          data: [],
        });
      }

      const images = await ProductImage.findAll();

      if (images.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada image product",
          data: [],
        });
      }

      const productWithImage = products.map((product) => {
        const productData = product.toJSON();
        const findImage = images.filter(
          (image) => image.ProductId === productData.id
        );
        productData.Images = findImage;
        return productData;
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data product",
        data: productWithImage,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getProductByLocation(req, res, next) {
    try {
      const location = req.query.location ? req.query.location : "jakarta";

      const products = await Product.findAll({
        include: [Seller, ChildrenSubCategory],
        where: {
          location: {
            [Op.iLike]: `%${location}%`,
          },
        },
        limit: 12,
      });

      if (products.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada data product di lokasi ini",
          data: [],
        });
      }

      const images = await ProductImage.findAll();

      if (images.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada image product",
          data: [],
        });
      }

      const productWithImages = products.map((product) => {
        const productData = product.toJSON();
        const findImage = images.filter(
          (image) => image.ProductId === productData.id
        );
        productData.Images = findImage;
        return productData;
      });

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data product di lokasi ini",
        data: productWithImages,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductWithFilter(req, res, next) {
    try {
      const {
        name,
        category,
        priceMin,
        priceMax,
        location,
        sort,
        page,
        newCategory,
      } = req.query;

      const filterNewCategory = newCategory ? { id: Number(newCategory) } : {};
      const filterName = name ? { title: { [Op.iLike]: `%${name}%` } } : {};
      const filterCategory = category
        ? { ChildrenSubCategoryId: category }
        : {};

      let filterPrice = {};
      if (priceMin && priceMax) {
        filterPrice = {
          price: { [Op.between]: [Number(priceMin), Number(priceMax)] },
        };
      } else if (priceMin) {
        filterPrice = { price: { [Op.gte]: Number(priceMin) } };
      } else if (priceMax) {
        filterPrice = { price: { [Op.lte]: Number(priceMax) } };
      }

      const filterLocation = location
        ? { location: { [Op.iLike]: `%${location}%` } }
        : {};

      let sortProduct = [];
      if (sort === "termurah") {
        sortProduct = [["price", "ASC"]];
      } else if (sort === "termahal") {
        sortProduct = [["price", "DESC"]];
      }

      const limit = 9;
      const pageLimit = page ? Number(page) : 1;
      const offset = (pageLimit - 1) * limit;

      const { count, rows } = await Product.findAndCountAll({
        include: [
          {
            model: Seller,
            required: true,
          },
          {
            model: ChildrenSubCategory,
            required: true,
            include: {
              model: SubCategory,
              required: true,
              include: {
                model: Category,
                required: true,
                where: {
                  ...filterNewCategory,
                },
              },
            },
          },
        ],
        where: {
          ...filterName,
          ...filterCategory,
          ...filterPrice,
          ...filterLocation,
        },
        limit,
        offset,
        order: sortProduct.length ? sortProduct : [["createdAt", "DESC"]],
      });

      if (count === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Tidak ada data product",
        });
      }

      const productWithImages = await Promise.all(
        rows.map(async (product) => {
          const productData = product.toJSON();
          const findImage = await ProductImage.findAll({
            where: {
              ProductId: productData.id,
            },
          });
          productData.Images = findImage;
          return productData;
        })
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data product",
        data: productWithImages,
        pagination: {
          currentPage: pageLimit,
          totalPage: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: [
          {
            model: Seller,
            required: true,
          },
          {
            model: ChildrenSubCategory,
            required: true,
            include: {
              model: SubCategory,
              required: true,
              include: {
                model: Category,
                required: true,
              },
            },
          },
        ],
      });

      if (!product) {
        return res.status(404).json({
          statusCode: 404,
          message: "Product tidak ditemukan",
        });
      }

      const findImage = await ProductImage.findAll({
        where: {
          ProductId: product.id,
        },
      });

      if (findImage.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Image product tidak ditemukan",
          data: product,
        });
      }

      const newProduct = product.toJSON();
      newProduct.Images = findImage;

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data product",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicController;

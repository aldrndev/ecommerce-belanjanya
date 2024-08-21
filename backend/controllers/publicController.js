const { Op, or } = require("sequelize");
const {
  Product,
  ChildrenSubCategory,
  SubCategory,
  Category,
  User,
  Seller,
  ProductImage,
  Discussion,
  Profile,
  DiscussionMessage,
  Review,
  ReviewImage,
  SlugProduct,
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

  static async getMoreProduct(req, res, next) {
    try {
      const { category } = req.query;

      let categoryFilter = category
        ? {
            ChildrenSubCategoryId: category,
          }
        : {};

      const product = await Product.findAll({
        where: {
          ...categoryFilter,
        },
        include: [Seller],
        order: [["createdAt", "DESC"]],
        limit: 8,
      });

      const newProduct = await Promise.all(
        product.map(async (product) => {
          const findImage = await ProductImage.findAll({
            where: {
              ProductId: product.id,
            },
          });
          return {
            ...product.toJSON(),
            Images: findImage,
          };
        })
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data product",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDiscussionPublic(req, res, next) {
    try {
      const { productId } = req.params;
      const { page } = req.query;

      const limit = 5;
      const pageLimit = page ? Number(page) : 1;
      const offset = (pageLimit - 1) * limit;

      const { count, rows } = await Discussion.findAndCountAll({
        where: {
          ProductId: productId,
        },
        include: {
          model: Product,
          include: {
            model: Seller,
          },
        },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      if (count === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Belum ada diskusi",
          data: [],
        });
      }

      const discussionMsg = await DiscussionMessage.findAll({
        include: {
          model: Discussion,
          include: {
            model: Product,
            include: {
              model: Seller,
            },
          },
        },
        order: [["createdAt", "ASC"]],
      });

      const groupedDiscussion = await Promise.all(
        rows.map(async (discussion) => {
          const messages = discussionMsg.filter(
            (msg) => msg.DiscussionId === discussion.id
          );

          const profile = await Profile.findOne({
            where: {
              UserId: discussion.UserId,
            },
          });

          return {
            ...discussion.toJSON(),
            messages,
            profile,
          };
        })
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data diskusi",
        data: groupedDiscussion,
        pagination: {
          currentPage: pageLimit,
          totalPage: Math.ceil(count / limit),
          count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getReviewPublic(req, res, next) {
    try {
      const { productId, page } = req.query;

      const limit = 5;
      const pageLimit = page ? Number(page) : 1;
      const offset = (pageLimit - 1) * limit;

      const { count, rows } = await Review.findAndCountAll({
        where: {
          ProductId: productId,
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
          message: "Belum ada review",
          data: [],
        });
      }

      const groupedReview = await Promise.all(
        rows.map(async (review) => {
          const image = await ReviewImage.findAll({
            where: {
              ReviewId: review.id,
            },
          });

          const newReview = review.toJSON();
          newReview.Images = image;
          return newReview;
        })
      );

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data review",
        data: groupedReview,
        pagination: {
          currentPage: pageLimit,
          totalPage: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSlugProduct(req, res, next) {
    try {
      const { seller, title } = req.query;

      const slug = await SlugProduct.findOne({
        where: {
          slugSeller: seller,
          slugProduct: title,
        },
        include: [
          {
            model: Product,
            include: [
              {
                model: ChildrenSubCategory,
              },
              {
                model: Seller,
              },
            ],
          },
          {
            model: Seller,
          },
        ],
      });

      if (!slug) {
        return next(new Error("Slug product tidak ditemukan"));
      }

      const findImage = await ProductImage.findAll({
        where: {
          ProductId: slug.ProductId,
        },
      });

      const newSlug = slug.toJSON();
      newSlug.Product.Images = findImage;

      res.status(200).json({
        statusCode: 200,
        message: "Sukses mengambil data slug product",
        data: newSlug,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicController;

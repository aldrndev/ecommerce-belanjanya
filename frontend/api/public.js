import { pagination } from "@nextui-org/react";
import { axiosApi } from "./axios";

export const fetchAllProducts = async () => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: "/public/product",
    });

    return data.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data product"
    );
  }
};

export const fetchProductByLocation = async (location) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: "/public/product/location",
      params: {
        location,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data product"
    );
  }
};

export const fetchProductWithFilter = async (
  name,
  category,
  priceMin,
  priceMax,
  location,
  sort,
  newCategory,
  page
) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: "/public/product/filter",
      params: {
        name,
        category,
        priceMin,
        priceMax,
        location,
        sort,
        newCategory,
        page,
      },
    });
    const newData = {
      data: data.data,
      pagination: data.pagination,
    };

    return newData;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data product"
    );
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: `/public/product/${id}`,
    });

    return data.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data product"
    );
  }
};

export const fetchProductMore = async (category) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: "/public/product/more",
      params: {
        category,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data product"
    );
  }
};

export const fetchDiscussionPublic = async (productId, page = 1) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: `/public/discussion/${productId}`,
      params: {
        page,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data discussion"
    );
  }
};

export const fetchReviewPublic = async (productId, page = 1) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: `/public/review`,
      params: {
        page,
        productId,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data review"
    );
  }
};

export const fetchSlugProduct = async (seller, title) => {
  try {
    const { data } = await axiosApi({
      method: "GET",
      url: `/public/product/slug`,
      params: {
        seller,
        title,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data review"
    );
  }
};

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
  page = 1
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

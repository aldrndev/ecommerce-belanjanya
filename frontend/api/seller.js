import api from "./axios";

export const createProduct = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: "/seller/product",
      data: body,
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal menyimpan produk"
    );
  }
};

export const fetchCategory = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/seller/category",
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal mengambil kategori"
    );
  }
};

export const fetchSubCategory = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/seller/sub-category",
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil sub kategori"
    );
  }
};

export const fetchChildrenSubCategory = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/seller/children-sub-category",
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil sub kategori"
    );
  }
};

export const fetchMyProduct = async () => {
  try {
    
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data product"
    );
  }
};

import api from "./axios";

export const fetchCart = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/user/cart",
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data cart"
    );
  }
};

export const addCart = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: "/user/cart",
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal menambahkan cart"
    );
  }
};

export const updateCart = async (body) => {
  try {
    const data = await api({
      method: "PUT",
      url: "/user/cart",
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal mengupdate cart"
    );
  }
};

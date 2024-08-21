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

export const removeCart = async (cartId) => {
  try {
    const data = await api({
      method: "DELETE",
      url: "/user/cart",
      data: {
        cartId,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal menghapus cart"
    );
  }
};

export const bulkRemoveCart = async (cartId) => {
  try {
    const data = await api({
      method: "DELETE",
      url: "/user/cart/bulk",
      data: {
        cartId,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal menghapus cart"
    );
  }
};

export const addWishlist = async (productId) => {
  try {
    const data = await api({
      method: "POST",
      url: "/user/wishlist",
      data: {
        productId,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal menambahkan wishlist"
    );
  }
};

export const fetchWishlist = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/user/wishlist",
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data wishlist"
    );
  }
};

export const fetchWishlistWithPagination = async (page = 1) => {
  try {
    const data = await api({
      method: "GET",
      url: "/user/wishlist/pagination",
      params: {
        page,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data wishlist"
    );
  }
};

export const removeWishlist = async (productId) => {
  try {
    const data = await api({
      method: "DELETE",
      url: "/user/wishlist",
      data: {
        productId,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal menghapus wishlist"
    );
  }
};

export const addCheckout = async (cartId) => {
  try {
    const data = await api({
      method: "POST",
      url: "/user/checkout",
      data: {
        cartId,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal checkout"
    );
  }
};

export const fetchCheckout = async () => {
  try {
    const data = await api({
      method: "GET",
      url: "/user/checkout",
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data checkout"
    );
  }
};

export const addShipmentInfo = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: "/user/shipment",
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal checkout"
    );
  }
};

export const fetchShipmentInfo = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/user/shipment",
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data shipment"
    );
  }
};
export const addOrder = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: "/user/order",
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal membuat pesanan"
    );
  }
};

export const fetchOrder = async (title, date, page = 1) => {
  try {
    const data = await api({
      method: "GET",
      url: "/user/order",
      params: {
        page,
        title,
        date,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Gagal mengambil data pesanan"
    );
  }
};

export const fetchDiscussion = async () => {
  try {
    const { data } = await api({
      method: "GET",
      url: "/user/discussion",
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

export const addDiscussion = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: "/user/discussion",
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || error.message || "Gagal membuat discussion"
    );
  }
};

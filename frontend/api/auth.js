import api, { axiosApi } from "./axios";
import axios from "axios";

export const login = async (body) => {
  try {
    const { data } = await axiosApi({
      method: "POST",
      url: `/auth/login`,
      data: {
        ...body,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Login belum berhasil, periksa email dan password kamu"
    );
  }
};

export const registerUser = async (body) => {
  try {
    const { data } = await axiosApi({
      method: "POST",
      url: `/auth/register`,
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat melakukan registrasi"
    );
  }
};

export const verifyUser = async (body) => {
  try {
    const { data } = await axiosApi({
      method: "POST",
      url: `/auth/verify`,
      data: {
        ...body,
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat melakukan verifikasi"
    );
  }
};

export const createProfile = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: `/auth/profile`,
      data: {
        ...body,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat menyimpan profile"
    );
  }
};

export const registerSeller = async (body) => {
  try {
    const data = await api({
      method: "POST",
      url: "/seller/register",
      data: {
        ...body,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat melakukan registrasi"
    );
  }
};

export const indonesiaProvince = async () => {
  try {
    const { data } = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat mengambil data"
    );
  }
};

export const indonesiaCity = async (provinceId) => {
  try {
    const { data } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat mengambil data"
    );
  }
};

export const indonesiaDistrict = async (cityId) => {
  try {
    const { data } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat mengambil data"
    );
  }
};

export const indonesiasubDistrict = async (districtId) => {
  try {
    const { data } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        error.message ||
        "Ada kesalahan saat mengambil data"
    );
  }
};

export const logout = async (messageCb) => {
  try {
    const { data } = await axiosApi({
      method: "POST",
      url: `/auth/logout`,
    });

    messageCb(data.message);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        error?.message ||
        "Ada kesalahan saat keluar"
    );
  }
};

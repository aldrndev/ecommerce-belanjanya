import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    key: "sub1",
    label: "Menu User",
    icon: <UserOutlined />,
    children: [
      {
        key: "g1",
        label: "Info Akun",
        type: "group",
        children: [
          {
            key: "1",
            label: <Link to="/user/profile">Profile</Link>,
          },
          {
            key: "2",
            label: <Link to="/user/order-history">Riwayat Pesanan</Link>,
          },
          {
            key: "3",
            label: <Link to="/user/wishlist">Wishlist</Link>,
          },
        ],
      },
      {
        key: "g2",
        label: "Kotak Masuk",
        type: "group",
        children: [
          {
            key: "4",
            label: <Link to="/user/chat">Chat</Link>,
          },
          {
            key: "5",
            label: <Link to="/user/discussion">Diskusi Produk</Link>,
          },
          {
            key: "6",
            label: <Link to="/user/review">Ulasan Produk</Link>,
          },
        ],
      },
      {
        key: "g3",
        label: "Pengaturan",
        type: "group",
        children: [
          {
            key: "7",
            label: <Link to="/user/change-profile">Ubah Profile</Link>,
          },
          {
            key: "8",
            label: <Link to="/user/change-password">Ubah Password</Link>,
          },
          {
            key: "9",
            label: <Link to="/user/change-email">Ubah Email</Link>,
          },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Menu Seller",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "16",
        label: <Link to="/seller/register">Daftar Seller</Link>,
      },
      {
        key: "10",
        label: <Link to="/seller/add-product">Jual Produk</Link>,
      },
      {
        key: "15",
        label: <Link to="/seller/product-list">Daftar Produk</Link>,
      },
      {
        key: "11",
        label: <Link to="/seller/sales-history">Riwayat Penjualan</Link>,
      },
      {
        key: "12",
        label: <Link to="/seller/balance-withdrawal">Penarikan Saldo</Link>,
      },
      {
        key: "sub3",
        label: "Aktifitas Penjualan",
        children: [
          {
            key: "13",
            label: <Link to="/seller/review">Ulasan</Link>,
          },
          {
            key: "14",
            label: <Link to="/seller/discussion">Diskusi</Link>,
          },
        ],
      },
    ],
  },
];
const pathToKeyMap = {
  "/user/profile": "1",
  "/user/order-history": "2",
  "/user/wishlist": "3",
  "/user/chat": "4",
  "/user/discussion": "5",
  "/user/review": "6",
  "/user/change-profile": "7",
  "/user/change-password": "8",
  "/user/change-email": "9",
  "/seller/register": "16",
  "/seller/add-product": "10",
  "/seller/product-list": "15",
  "/seller/sales-history": "11",
  "/seller/balance-withdrawal": "12",
  "/seller/review": "13",
  "/seller/discussion": "14",
};

const UserSidebar = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    const defaultSelectedKey = pathToKeyMap[currentPath];
    setSelectedKey(defaultSelectedKey);
  }, [location]);

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
      selectedKeys={[selectedKey]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default UserSidebar;

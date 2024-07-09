import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const items = [
  {
    key: "sub1",
    label: "User Menu",
    icon: <UserOutlined />,
    children: [
      {
        key: "g1",
        label: "Info Akun",
        type: "group",
        children: [
          {
            key: "1",
            label: "Profile",
          },
          {
            key: "2",
            label: "Riwayat Pesanan",
          },
          {
            key: "3",
            label: "Wishlist",
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
            label: "Chat",
          },
          {
            key: "5",
            label: "Diskusi Produk",
          },
          {
            key: "6",
            label: "Ulasan Produk",
          },
        ],
      },
      {
        key: "g3",
        label: "Pengaturan",
        type: "group",
        children: [
          {
            key: "1",
            label: "Ubah Profile",
          },
          {
            key: "2",
            label: "Ubah Password",
          },
          {
            key: "3",
            label: "Ubah Email",
          },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Seller Menu",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "5",
        label: "Jual Barang",
      },
      {
        key: "6",
        label: "Riwayat Penjualan",
      },
      {
        key: "6",
        label: "Pencairan Saldo",
      },
      {
        key: "sub3",
        label: "Aktifitas Penjualan",
        children: [
          {
            key: "7",
            label: "Ulasan",
          },
          {
            key: "8",
            label: "Diskusi",
          },
        ],
      },
    ],
  },
];

const UserSidebar = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default UserSidebar;

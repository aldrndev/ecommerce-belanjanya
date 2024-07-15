import React from "react";
import Logo from "./Logo";
import { Input } from "@nextui-org/react";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import AuthPage from "./AuthPage";
import CartHover from "./hover/CartHover";
import MessageHover from "./hover/MessageHover";
import ProfileHover from "./hover/ProfileHover";

const Navbar = () => {
  return (
    <nav className="container mx-auto">
      <div className="flex justify-between gap-10 items-center h-32 mx-auto">
        <div>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className="flex w-[500px]">
          <Input
            type="search"
            placeholder="Cari barang yang kamu inginkan..."
            fullWidth
            startContent={<SearchOutlined />}
            size="lg"
          />
        </div>
        <div className="flex gap-3 justify-center items-center ">
          <CartHover />
          <MessageHover />
        </div>
        <div className="flex gap-5 justify-center items-center">
          <AuthPage />
          <ProfileHover />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

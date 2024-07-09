import React from "react";
import Logo from "./Logo";
import { Button, Input } from "@nextui-org/react";
import CartBadge from "./CartBadge";
import MessageBadge from "./MessageBadge";
import AvatarProfile from "./AvatarProfile";
import { NavLink } from "react-router-dom";
import AuthPage from "./AuthPage";
import { FaSearch } from "react-icons/fa";
import CartHover from "./hover/CartHover";
import MessageHover from "./hover/MessageHover";
import ProfileHover from "./hover/ProfileHover";

const Navbar = () => {
  return (
    <nav className="container mx-auto">
      <div className="flex justify-between p-10 gap-10 items-center">
        <div className="flex  ">
          <NavLink to="/" className="hover:text-primary">
            <Logo />
          </NavLink>
        </div>
        <div className="flex w-[500px]">
          <Input
            type="search"
            placeholder="Cari barang yang kamu inginkan..."
            fullWidth
            startContent={<FaSearch />}
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

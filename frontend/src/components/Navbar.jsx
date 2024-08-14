import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Input } from "@nextui-org/react";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";
import CartHover from "./hover/CartHover";
import MessageHover from "./hover/MessageHover";
import ProfileHover from "./hover/ProfileHover";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLogin = localStorage.getItem("isLogin");
  const [search, setSearch] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handlerEnter = (e) => {
    if (e.key === "Enter") {
      navigate("/product?name=" + search);
    }
  };

  return (
    <nav className="container mx-auto">
      <div className="flex justify-between gap-10 items-center h-32 mx-auto">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex w-[500px]">
          <Input
            type="search"
            placeholder="Cari barang yang kamu inginkan..."
            fullWidth
            startContent={<SearchOutlined />}
            size="lg"
            onValueChange={handleSearch}
            onKeyDown={handlerEnter}
          />
        </div>
        <div className="flex gap-3 justify-center items-center">
          {isLogin && <CartHover />}
          {isLogin && <MessageHover />}
        </div>
        <div className="flex gap-5 justify-center items-center">
          {!isLogin ? <AuthPage /> : <ProfileHover user={user} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

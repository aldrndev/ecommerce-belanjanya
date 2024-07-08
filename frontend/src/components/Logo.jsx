import { Image } from "@nextui-org/react";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="/logo.png"
        alt="logo"
        className="object-contain"
        width={200}
      />
    </div>
  );
};

export default Logo;

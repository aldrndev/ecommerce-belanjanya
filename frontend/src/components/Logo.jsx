import { Image } from "@nextui-org/react";

const Logo = () => {
  return (
    <div>
      <Image
        src="/logo2.png"
        alt="logo"
        className="object-contain"
        width={300}
      />
    </div>
  );
};

export default Logo;

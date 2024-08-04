import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { RiComputerLine } from "react-icons/ri";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { GiBlender } from "react-icons/gi";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { FaCar } from "react-icons/fa";

const HomeCategory = () => {
  const category = [
    {
      name: "Elektronik & Komputer",
      path: "/product?newCategory=1",
      icon: <RiComputerLine size={24} />,
    },
    {
      name: "Pakaian Pria",
      path: "/product?newCategory=2",
      icon: <IoIosMan size={24} />,
    },
    {
      name: "Pakaian Wanita",
      path: "/product?newCategory=3",
      icon: <IoIosWoman size={24} />,
    },
    {
      name: "Peralatan Rumah Tangga",
      path: "/product?newCategory=4",
      icon: <GiBlender size={24} />,
    },
    {
      name: "Peralatan Olahraga",
      path: "/product?newCategory=5",
      icon: <MdOutlineSportsSoccer size={24} />,
    },
    {
      name: "Otomotif",
      path: "/product?newCategory=6",
      icon: <FaCar size={24} />,
    },
  ];
  return (
    <div className="flex gap-3 max-w-7xl">
      {category.map((item, index) => {
        return (
          <Button
            key={index}
            variant="solid"
            color="danger"
            size="lg"
            radius="full"
            className="h-full"
          >
            <Link to={item.path}>
              <div className="flex justify-center items-center gap-x-3 p-3">
                <div>{item.icon}</div>
                <p>{item.name}</p>
              </div>
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default HomeCategory;

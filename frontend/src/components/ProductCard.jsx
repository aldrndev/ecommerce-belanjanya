import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { GoHeart, GoHeartFill } from "react-icons/go";

const ProductCard = ({ product }) => {
  return (
    <Card shadow="sm">
      <CardBody className="overflow-visible rounded-2xl ">
        <div>
          <Image
            shadow="sm"
            radius="lg"
            width={"100%"}
            alt={product?.title}
            src={product?.img}
            className="w-full object-contain h-[250px]"
            isZoomed
          />
        </div>
      </CardBody>
      <CardFooter className="h-full">
        <div className="flex justify-start flex-col gap-2 w-full p-3">
          <div className="flex justify-between ">
            <div className="flex justify-start">
              <b>{product?.title}</b>
            </div>
            <div className="flex justify-end">
              <GoHeart size={20} />
            </div>
          </div>
          <p className="text-default-500">{product?.price}</p>
          <div className="flex items-center gap-1">
            <CiLocationOn />
            Jakarta, Indonesia
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

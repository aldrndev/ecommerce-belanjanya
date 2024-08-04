import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { FaStar } from "react-icons/fa";

import { formatRupiah } from "../../utils/formatCurrency";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Link]);
  return (
    <Card shadow="sm">
      <CardBody className="overflow-visible rounded-2xl ">
        <div>
          <Link
            to={`/${product?.Seller?.name
              .toLowerCase()
              .replace(" ", "")}/${product?.title
              .toLowerCase()
              .replaceAll(" ", "-")}?id=${product?.id}`}
          >
            <Image
              shadow="sm"
              radius="lg"
              width={"100%"}
              alt={product?.title}
              src={`http://localhost:3000/${product?.Images?.at(0).image}`}
              className="w-full object-contain h-[220px] cursor-pointer"
              isZoomed
            />
          </Link>
        </div>
      </CardBody>
      <CardFooter className="h-full">
        <div className="flex justify-start flex-col gap-2 w-full p-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-start cursor-pointer">
              <Link
                to={`/${product?.Seller?.name
                  .toLowerCase()
                  .replace(" ", "")}/${product?.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}?id=${product?.id}`}
              >
                <b>{product?.title}</b>
              </Link>
            </div>
            <div className="flex justify-end">
              <HeartOutlined />
            </div>
          </div>
          <p className="text-default-500">{formatRupiah(product?.price)}</p>
          <div className="flex items-center gap-1">
            <EnvironmentOutlined />
            {product?.location}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <FaStar className="text-yellow-400" />
              <span>4.9</span>
              <p>| 100+ terjual</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

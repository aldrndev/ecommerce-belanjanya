import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { FaStar } from "react-icons/fa";

import { formatRupiah } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import AuthPage from "./AuthPage";

const ProductCard = ({
  product,
  wishlistData,
  handleRemoveWishlist,
  handleWishlist,
  isLogin,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Link]);
  return (
    <Card shadow="sm" className="h-full">
      <CardBody className="overflow-visible rounded-2xl">
        <div>
          <Link
            to={`/${product?.Seller?.name
              .toLowerCase()
              .replace(" ", "")}/${product?.title
              .toLowerCase()
              .replace(/[-\s]+/g, "-")
              .replace(/\//g, "-")}`}
            state={{ product }}
          >
            <Image
              shadow="sm"
              radius="lg"
              width={"100%"}
              alt={product?.title}
              src={`http://localhost:3000/${product?.Images?.at(0)?.image}`}
              className="w-full object-contain h-[220px]"
              isZoomed
            />
          </Link>
        </div>
      </CardBody>
      <CardFooter className="h-full">
        <div className="flex flex-col gap-2 w-full p-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-start">
              <Link
                to={`/${product?.Seller?.name
                  .toLowerCase()
                  .replace(" ", "")}/${product?.title
                  .toLowerCase()
                  .replace(/[-\s]+/g, "-")
                  .replace(/\//g, "-")}`}
                state={{ product }}
              >
                <b>
                  {product?.title.length >= 45
                    ? product?.title.slice(0, 45) + "..."
                    : product?.title}
                </b>
              </Link>
            </div>
            {isLogin ? (
              <div
                className="flex justify-end cursor-pointer"
                onClick={
                  wishlistData?.find((item) => item.ProductId === product?.id)
                    ? () => handleRemoveWishlist(product?.id)
                    : () => handleWishlist(product?.id)
                }
              >
                {wishlistData?.find(
                  (item) => item.ProductId === product?.id
                ) ? (
                  <HeartFilled className="text-danger" />
                ) : (
                  <HeartOutlined />
                )}
              </div>
            ) : (
              <AuthPage iconAuth={true} iconName={<HeartOutlined />} />
            )}
          </div>
          <p className="text-default-500">{formatRupiah(product?.price)}</p>
          <div className="flex items-center gap-1">
            <EnvironmentOutlined />
            <p className="capitalize">{product?.location?.toLowerCase()}</p>
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

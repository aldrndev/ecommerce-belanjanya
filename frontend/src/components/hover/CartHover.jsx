import {
  Tooltip,
  Button,
  Badge,
  Divider,
  Image,
  link,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { fetchCart } from "../../../api/user";
import { formatRupiah } from "../../../utils/formatCurrency";

const CartHover = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const totalCart = data?.reduce((acc, item) => {
    return acc + item.products.length;
  }, 0);

  return (
    <Tooltip
      content={<Content data={data} totalCart={totalCart} />}
      closeDelay={100}
    >
      <Button as={Link} to="/cart" isIconOnly variant="light" size="lg">
        <Badge content={totalCart} color="danger">
          <HiOutlineShoppingCart size={24} />
        </Badge>
      </Button>
    </Tooltip>
  );
};

export default CartHover;

const Content = ({ data, totalCart }) => {
  return (
    <div className="w-[500px] h-[400px] p-5 overflow-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-base">
            Keranjang ({totalCart ?? "0"})
          </h1>
        </div>
        <div className="text-base">
          <Link to="/cart" className="text-danger hover:text-red-700 ">
            Lihat
          </Link>
        </div>
      </div>
      <Divider className="my-4" />
      {data?.map((item) => {
        return item.products.map((item, index) => (
          <div key={index}>
            <div className="mt-3 flex justify-between">
              <div className="flex gap-2">
                <Image
                  src={`http://localhost:3000/${
                    item?.Product.Images?.at(0)?.image
                  }`}
                  width={50}
                  height={50}
                />
                <p className="">
                  {item?.Product?.title?.length >= 30
                    ? item?.Product?.title?.slice(0, 30) + "..."
                    : item?.Product?.title}
                </p>
              </div>
              <div>
                <p className="font-bold">
                  {item?.quantity} x {formatRupiah(item?.Product?.price)}
                </p>
              </div>
            </div>
            <Divider className="my-4" />
          </div>
        ));
      })}
    </div>
  );
};

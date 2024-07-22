import {
  Tooltip,
  Button,
  Badge,
  Divider,
  Image,
  link,
} from "@nextui-org/react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";

const CartHover = () => {
  return (
    <Tooltip content={<Content />} closeDelay={100}>
      <Button as={Link} to="/cart" isIconOnly variant="light" size="lg">
        <Badge content="2" color="danger">
          <HiOutlineShoppingCart size={24} />
        </Badge>
      </Button>
    </Tooltip>
  );
};

export default CartHover;

const description =
  "[RESMI] Apple iPad Air 5 M1 2022 10.9 64GB 256GB Garansi 1 Tahun - 64GB PROMO, WIFI SPACE GREY";

const truncate = description.slice(0, 30) + "...";

const Content = () => {
  return (
    <div className="w-[500px] h-[400px] p-5 overflow-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-base">Keranjang(5)</h1>
        </div>
        <div className="text-base">
          <Link to="/cart" className="text-danger hover:text-red-700 ">
            Lihat
          </Link>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-3 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/19/822bcb9b-00d7-4f89-89f5-f3159d56f888.jpg"
            width={50}
            height={50}
          />
          <p className="">{truncate}</p>
        </div>
        <div>
          <p className="font-bold">1 x Rp1.000.000</p>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-3 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/19/822bcb9b-00d7-4f89-89f5-f3159d56f888.jpg"
            width={50}
            height={50}
          />
          <p className="">{truncate}</p>
        </div>
        <div>
          <p className="font-bold">1 x Rp1.000.000</p>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-3 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/19/822bcb9b-00d7-4f89-89f5-f3159d56f888.jpg"
            width={50}
            height={50}
          />
          <p className="">{truncate}</p>
        </div>
        <div>
          <p className="font-bold">1 x Rp1.000.000</p>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-3 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/19/822bcb9b-00d7-4f89-89f5-f3159d56f888.jpg"
            width={50}
            height={50}
          />
          <p className="">{truncate}</p>
        </div>
        <div>
          <p className="font-bold">1 x Rp1.000.000</p>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-3 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/19/822bcb9b-00d7-4f89-89f5-f3159d56f888.jpg"
            width={50}
            height={50}
          />
          <p className="">{truncate}</p>
        </div>
        <div>
          <p className="font-bold">1 x Rp1.000.000</p>
        </div>
      </div>
    </div>
  );
};

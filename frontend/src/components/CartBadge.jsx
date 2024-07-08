import { Badge, Button } from "@nextui-org/react";
import { HiOutlineShoppingCart } from "react-icons/hi2";

const CartBadge = () => {
  return (
    <Badge content="2" color="danger">
      <Button isIconOnly variant="light">
        <HiOutlineShoppingCart size={24} />
      </Button>
    </Badge>
  );
};

export default CartBadge;

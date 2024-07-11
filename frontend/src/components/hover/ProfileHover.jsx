import {
  Tooltip,
  Listbox,
  ListboxItem,
  User,
  Card,
  CardBody,
  Image,
  Divider,
  Button,
} from "@nextui-org/react";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProfileHover = () => {
  return (
    <Tooltip content={<Content />} closeDelay={100}>
      <div className="flex gap-x-2 items-center">
        <Image
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          width={50}
          radius="full"
        />
        <div>
          <p className="text-sm">Aldrin Mursidi</p>
        </div>
      </div>
    </Tooltip>
  );
};

export default ProfileHover;

const items = [
  {
    key: "2",
    label: "/user/discussion",
    name: "Diskusi",
  },
  {
    key: "3",
    label: "/user/review",
    name: "Ulasan",
  },
  {
    key: "7",
    label: "/user/wishlist",
    name: "Wishlist",
  },
];
const items2 = [
  {
    key: "4",
    label: "/user/profile",
    name: "Profile",
  },
  {
    key: "5",
    label: "/user/chat",
    name: "Chat",
  },
  {
    key: "6",
    label: "/user/order-history",
    name: "Riwayat Pesanan",
  },
];
const Content = () => {
  return (
    <div className="w-[300px]">
      <Card className="mt-2">
        <CardBody>
          <div className="flex gap-2">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              width={50}
            />
            <div className="flex flex-col gap-1">
              <p>Aldrin Mursidi</p>
              <div className="flex gap-1">
                <RiPoliceBadgeFill size={20} className="text-sky-600" />
                Member Diamond
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="flex justify-between p-5 items-center mt-2">
        <div className="flex gap-2 items-center">
          <GrMoney size={20} className="text-warning" />
          <p className="text-small">Saldo</p>
        </div>
        <div className="font-bold">Rp50.000.000</div>
      </div>
      <Divider className="my-1" />
      <div className="grid grid-cols-2 gap-2">
        <div className="mt-2 flex flex-col gap-y-1">
          {items2.map((item, index) => (
            <Button
              as={Link}
              to={item.label}
              key={index}
              variant="flat"
              className="mb-1"
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-y-1">
          {items.map((item, index) => (
            <Button
              as={Link}
              to={item.label}
              key={index}
              variant="flat"
              className="mb-1"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 mb-4">
        <Button
          variant="bordered"
          startContent={<IoLogOutOutline size={20} />}
          color="danger"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

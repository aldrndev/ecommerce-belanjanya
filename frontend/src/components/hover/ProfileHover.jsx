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
  Chip,
} from "@nextui-org/react";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../api/auth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSeller } from "../seller/RegisterSeller";
import { MdVerified } from "react-icons/md";

const ProfileHover = ({ user }) => {
  return (
    <Tooltip content={<Content />} closeDelay={100}>
      <Link to="/user/profile">
        <div className="flex gap-x-1 items-center">
          <Image
            src={`http://localhost:3000/${user.image}`}
            width={60}
            height={60}
            radius="full"
            alt="User profile"
            className="object-contain"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-x-1 items-center">
              <MdVerified size={16} className="text-danger" />
              <p className="text-base capitalize">{user.name}</p>
            </div>
            <div className="flex gap-1 items-center">
              <Chip color="success" variant="flat" size="sm">
                <p className="text-xs">Verified User</p>
              </Chip>
            </div>
          </div>
        </div>
      </Link>
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsSeller } = useSeller();

  const messageCB = (message) => {
    toast.success(message);
  };

  const handleLogout = () => {
    logout(messageCB);
    localStorage.clear();
    queryClient.clear();
    setIsSeller(false);
    navigate("/logout");
  };
  return (
    <div className="w-[300px]">
      <div className="grid grid-cols-2 gap-2">
        <div className="mt-2 flex flex-col gap-y-1">
          {items2.map((item, index) => (
            <Button
              as={Link}
              to={item.label}
              key={index}
              variant="light"
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
              variant="light"
              className="mb-1"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 mb-4">
        <Button
          variant="light"
          startContent={<IoLogOutOutline size={20} />}
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

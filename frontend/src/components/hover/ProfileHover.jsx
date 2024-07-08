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

const ProfileHover = () => {
  return (
    <Tooltip content={<Content />} closeDelay={100}>
      <User
        avatarProps={{
          isBordered: true,
          src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        }}
        className="transition-transform"
        description="@aldrnmrsd"
        name="Aldrin Mursidi"
      />
    </Tooltip>
  );
};

export default ProfileHover;

const items = [
  {
    key: "edit2",
    label: "Jual Barang",
  },
  {
    key: "new",
    label: "Chat",
  },
  {
    key: "copy",
    label: "Diskusi",
  },
  {
    key: "edit",
    label: "Ulasan",
  },
];
const items2 = [
  {
    key: "new",
    label: "Profile",
  },
  {
    key: "copy",
    label: "Riwayat Pesanan",
  },
  {
    key: "edit",
    label: "Wishlist",
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
      <div className="flex justify-between p-5">
        <div className="flex gap-2 items-center">
          <GrMoney size={20} className="text-warning" />
          <p className="text-small">Saldo</p>
        </div>
        <div className="font-bold">Rp50.000.00</div>
      </div>
      <Divider className="my-1" />
      <div className="flex justify-between">
        <div className="mt-2">
          <Listbox
            items={items}
            aria-label="Dynamic Actions"
            onAction={(key) => alert(key)}
          >
            {(item) => (
              <ListboxItem key={item.key} color={"default"}>
                {item.label}
              </ListboxItem>
            )}
          </Listbox>
        </div>
        <div className="mt-4">
          <Divider orientation="vertical" />
        </div>
        <div className="mt-2">
          <Listbox
            items={items2}
            aria-label="Dynamic Actions"
            onAction={(key) => alert(key)}
          >
            {(item) => (
              <ListboxItem key={item.key} color={"default"}>
                {item.label}
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 mb-4">
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

import {
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import {
  SearchOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import CardLayout from "./CardLayout";
import OrderDetail from "./modal/OrderDetail";
import ReviewModal from "./modal/ReviewModal";
import TrackingOrder from "./modal/TrackingOrder";
import ChatModal from "./modal/ChatModal";

const OrderHistory = () => {
  return (
    <div>
      <CardLayout>
        <div className="flex justify-between items-center">
          <div className="flex justify-start w-1/3">
            <Input
              endContent={<SearchOutlined />}
              placeholder="Cari pesanan kamu"
              fullWidth
            />
          </div>
          <div className="w-[200px]">
            <Select label="Pilih Tanggal" size="sm">
              <SelectItem value={"dog"}>7 Hari Terakhir</SelectItem>
              <SelectItem value={"dog"}>30 Hari Terakhir</SelectItem>
              <SelectItem value={"dog"}>3 Bulan Terakhir</SelectItem>
            </Select>
          </div>
        </div>
        <div>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
        <div className="mt-8 flex justify-center items-center">
          <Pagination
            isCompact
            showControls
            total={10}
            initialPage={1}
            color="danger"
          />
        </div>
      </CardLayout>
    </div>
  );
};

export default OrderHistory;

const OrderCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card className="mt-5 p-2" shadow="sm">
      <CardBody>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 text-sm items-center">
            <ShoppingOutlined size={24} className="text-success" />
            <p>9 Juli 2024</p>
            <Chip variant="flat" color="warning" size="sm">
              Diproses
            </Chip>
            <p>INV/20240709/BLJ/123456</p>
          </div>
          <div className="flex gap-x-2 text-sm items-center">
            <p>Batal Otomatis</p>
            <Chip variant="flat" color="danger" size="sm">
              <div className="flex gap-1">
                <ClockCircleOutlined />
                11 Jul 11:34
              </div>
            </Chip>
          </div>
        </div>
        <div className="mt-2 text-sm font-bold">Aldrin Mursidi</div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-x-2 w-full">
            <div>
              <Image
                src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                width={80}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Link to={"#"}>
                <p className="text-sm font-bold hover:text-danger ">
                  gerd zero pro lambung original obat herbal alami
                </p>
              </Link>

              <p className="text-sm">1 barang x Rp99.000</p>
            </div>
          </div>
          <div className="text-sm flex gap-1 flex-col w-1/5">
            <p>Total Belanja</p>
            <p className="font-bold">Rp99.000</p>
          </div>
        </div>
        <div className="flex justify-end items-center mt-8 gap-3">
          <OrderDetail />
          <ReviewModal />
          <TrackingOrder />
          <Button variant="solid" color="danger">
            Beli lagi
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreOutlined />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" onClick={onOpen}>
                Tanya Penjual
              </DropdownItem>
              <DropdownItem key="copy">Batalkan Pesanan</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <ChatModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </CardBody>
    </Card>
  );
};

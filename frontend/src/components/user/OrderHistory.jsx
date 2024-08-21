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
  Modal,
  ModalBody,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import { Link, useSearchParams } from "react-router-dom";
import CardLayout from "./CardLayout";
import OrderDetail from "./modal/OrderDetail";
import TrackingOrder from "./modal/TrackingOrder";
import ChatModal from "./modal/ChatModal";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../../../api/user";
import { formatDate, formatDateCancel } from "../../../utils/formatDate";
import { MdVerified } from "react-icons/md";
import { formatRupiah } from "../../../utils/formatCurrency";
import PaymentModal from "./modal/PaymentModal";
import { useEffect, useState } from "react";
import { Empty, Pagination } from "antd";

const OrderHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");

  const updateSearchParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    if (key !== "page") {
      newSearchParams.set("page", 1);
    }
    setSearchParams(newSearchParams);
  };

  const page = searchParams.get("page");
  const title = searchParams.get("title");
  const date = searchParams.get("date");

  const { data, isPending } = useQuery({
    queryKey: ["orders-history", title, date, page],
    queryFn: () => fetchOrder(title, date, page),
  });

  useEffect(() => {
    if (data?.pagination) {
      setTotalPage(data?.pagination?.totalPage);
    }
  }, [data?.pagination]);

  const handleSelection = (e) => {
    updateSearchParams("date", e.target.value);
  };

  const searchTitleHandler = (value) => {
    setSearchTitle(value);
  };

  const searchTitleKey = (e) => {
    if (e.key === "Enter") {
      updateSearchParams("title", searchTitle);
    }
  };

  useEffect(() => {
    if (!searchTitle) {
      searchParams.delete("title");
      setSearchParams(searchParams);
    }
  }, [searchTitle]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <div>
      <CardLayout>
        <div className="flex justify-between items-center">
          <div className="flex justify-start w-1/3">
            <Input
              startContent={<SearchOutlined />}
              placeholder="Cari pesanan kamu"
              onValueChange={searchTitleHandler}
              onKeyDown={searchTitleKey}
              value={searchTitle}
              fullWidth
              isClearable
            />
          </div>
          <div className="w-[200px]">
            <Select label="Pilih Tanggal" size="sm" onChange={handleSelection}>
              <SelectItem key={"7"}>7 Hari Terakhir</SelectItem>
              <SelectItem key={"30"}>30 Hari Terakhir</SelectItem>
              <SelectItem key={"90"}>90 Hari Terakhir</SelectItem>
            </Select>
          </div>
        </div>
        {data?.data.length > 0 ? (
          <>
            <div>
              {data?.data?.map((item, index) => (
                <OrderCard key={index} data={item} />
              ))}
            </div>
            <div className="mt-8 flex justify-center items-center">
              {data && (
                <Pagination
                  current={Number(page)}
                  onChange={(page) => updateSearchParams("page", page)}
                  total={totalPage * 10}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col gap-y-2">
            <Empty />
            <p>Pesanan tidak ditemukan</p>
          </div>
        )}
      </CardLayout>
    </div>
  );
};

export default OrderHistory;

const OrderCard = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onOpenChange: onOpenChangeCancel,
  } = useDisclosure();
  const [isFinish, setIsFinish] = useState(false);

  return (
    <Card className="mt-5 p-2" shadow="sm">
      <CardBody>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 text-sm items-center">
            <ShoppingOutlined size={24} className="text-success" />
            <p>{formatDate(new Date(data?.orderDate))}</p>
            <Chip
              variant="flat"
              color={
                data?.status === "1"
                  ? "danger"
                  : data?.status === "2" ||
                    data?.status === "3" ||
                    data?.status === "4" ||
                    data?.status === "5"
                  ? "warning"
                  : "success"
              }
              size="sm"
            >
              {data?.status === "1"
                ? "Menunggu Pembayaran"
                : data?.status === "2"
                ? "Menunggu Konfirmasi"
                : data?.status === "3"
                ? "Diproses"
                : data?.status === "4"
                ? "Sedang dikirim"
                : data?.status === "5"
                ? "Tiba di tujuan"
                : "Selesai"}
            </Chip>
            <p>{data?.invoiceNo}</p>
          </div>
          <div className="flex gap-x-2 text-sm items-center">
            <p>Batal Otomatis</p>
            <Chip variant="flat" color="danger" size="sm">
              <div className="flex gap-1">
                <ClockCircleOutlined />
                {formatDateCancel(
                  new Date(
                    new Date(data?.orderDate).setDate(
                      new Date(data?.orderDate).getDate() + 1
                    )
                  )
                )}
              </div>
            </Chip>
          </div>
        </div>
        <div className="flex gap-x-1 mt-2 text-sm font-bold capitalize items-center">
          <MdVerified className="text-danger" size={16} />
          {data?.sellerName}
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-x-2 w-full">
            <div>
              <Image
                src={`http://localhost:3000/${data?.products[0]?.Checkout?.Cart.Product.Images[0]?.image}`}
                width={80}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Link to={"#"}>
                <p className="font-bold hover:text-danger ">
                  {data?.products[0]?.Checkout?.Cart.Product.title}
                </p>
              </Link>

              <p className="text-sm text-gray-500">
                {data?.products[0]?.Checkout?.Cart.quantity} barang x{" "}
                {formatRupiah(
                  data?.products[0]?.Checkout?.Cart?.Product?.discount
                    ? data?.products[0]?.Checkout?.Cart?.Product?.price -
                        data?.products[0]?.Checkout?.Cart?.Product?.discount
                    : data?.products[0]?.Checkout?.Cart?.Product?.price
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {data?.products.length > 1
                  ? "+" + (data?.products.length - 1) + " product lainnya"
                  : ""}
              </p>
            </div>
          </div>
          <div className="text-sm flex gap-1 flex-col w-1/5">
            <p>Total Belanja</p>
            <p className="font-bold">{formatRupiah(data?.totalPrice)}</p>
          </div>
        </div>
        <div className="flex justify-end items-center mt-8 gap-3">
          {(data?.status === "2" ||
            data?.status === "3" ||
            data?.status === "4" ||
            data?.status === "5") && <OrderDetail data={data} />}
          {(data?.status === "3" || data?.status === "4") && (
            <>
              <TrackingOrder currentStep={Number(data?.status)} data={data} />
              <Popover
                isOpen={isFinish}
                onOpenChange={(open) => setIsFinish(open)}
                placement="top"
              >
                <PopoverTrigger>
                  <Button variant="solid" color="danger">
                    Selesai
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-3">
                    <p>Apakah anda yakin ingin menyelesaikan pesanan ini?</p>
                    <div className="flex gap-x-2 justify-center items-center mt-2">
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => setIsCancel(!isFinish)}
                      >
                        Ya
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onClick={() => setIsCancel(!isFinish)}
                      >
                        Tidak
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
          {data?.status === "1" && <PaymentModal />}
          {data?.status === "5" && (
            <Button variant="solid" color="danger">
              Beli lagi
            </Button>
          )}
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreOutlined />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="chat" onClick={onOpen}>
                Tanya Penjual
              </DropdownItem>
              <DropdownItem key="cancel" onClick={onOpenCancel}>
                Batalkan Pesanan
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Modal
            isOpen={isOpenCancel}
            onOpenChange={onOpenChangeCancel}
            scrollBehavior="inside"
            size="lg"
            className="p-2"
          >
            <ModalContent>
              {(onClose) => (
                <ModalBody>
                  <div className="p-3">
                    <p>Apakah anda yakin ingin membatalkan pesanan ini?</p>
                    <div className="flex gap-x-2 justify-center items-center mt-2">
                      <Button size="sm" color="danger" onClick={onClose}>
                        Ya
                      </Button>
                      <Button size="sm" variant="flat" onClick={onClose}>
                        Tidak
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </div>
        <ChatModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </CardBody>
    </Card>
  );
};

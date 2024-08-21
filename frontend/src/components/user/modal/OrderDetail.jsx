import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalHeader,
  Divider,
  Card,
  CardBody,
  Image,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Steps } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tooltip, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { MdVerified } from "react-icons/md";
import { formatRupiah } from "../../../../utils/formatCurrency";
import ReviewModal from "./ReviewModal";
import { DoneReview } from "../ReviewPage";
import { formatDateOrder } from "../../../../utils/formatDate";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success("No Resi berhasil disalin");
  });
};
const OrderDetail = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDetail, setIsDetail] = useState(false);
  const [isMore, setIsMore] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Link onClick={onOpen} className="hover:text-red-700 text-sm text-danger">
        Lihat Detail Transaksi
      </Link>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="2xl"
        className="p-2"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Pesanan
          </ModalHeader>
          <ModalBody>
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Detail Status</h2>
              <p
                className="text-danger hover:text-red-700 cursor-pointer text-sm"
                onClick={() => setIsDetail(!isDetail)}
              >
                {isDetail ? (
                  "Tutup"
                ) : (
                  <>
                    Lihat Detail <DownOutlined />
                  </>
                )}
              </p>
            </div>
            {isDetail && (
              <div className="mt-2">
                <OrderStatus currentStep={Number(data?.status)} data={data} />
              </div>
            )}
            <Divider className="my-4" />
            <div>
              <div className="flex justify-between items-center mb-3">
                <h1 className="font-semibold">Detail Produk</h1>
                <p className="flex gap-x-1 text-sm font-semibold capitalize items-center">
                  <MdVerified className="text-danger" size={16} />
                  {data?.sellerName}
                </p>
              </div>
              <OrderProduct item={data?.products?.[0]} />
              {isMore &&
                data?.products
                  ?.slice(1)
                  .map((item, index) => (
                    <OrderProduct key={index} item={item} />
                  ))}
              {data?.products?.length > 1 && (
                <p
                  className="text-danger hover:text-red-700 cursor-pointer text-sm mt-3"
                  onClick={() => setIsMore(!isMore)}
                >
                  {isMore ? (
                    "Lihat Sedikit"
                  ) : (
                    <>
                      Lihat Semua Produk <DownOutlined />
                    </>
                  )}
                </p>
              )}
            </div>
            <Divider className="my-4" />
            <div>
              <h2 className="font-semibold">Info Pengiriman</h2>
              <div>
                <table className="w-full text-sm mt-2">
                  <tbody>
                    <tr className="mb-4">
                      <td className="pr-14 pb-3">Kurir</td>
                      <td className="pb-3">{data?.courier}</td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-14 pb-3">No Resi</td>
                      <td className="pb-3">
                        <Tooltip title="Klik untuk menyalin">
                          <span
                            onClick={() => copyToClipboard("123456789")}
                            className="cursor-pointer"
                          >
                            {Math.floor(Math.random() * 100000000000 + 1)}
                            <CopyOutlined className="ml-1" />
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-20">Alamat</td>
                      <td className="capitalize">
                        {data?.products[0]?.Shipment?.receiver}
                      </td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-20 pb-3"></td>
                      <td>{data?.products[0]?.Shipment?.phone}</td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-20 pb-3"></td>
                      <td className="capitalize">
                        {data?.products[0]?.Shipment?.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Divider className="my-4" />
            <div>
              <h2 className="font-semibold">Rincian Pembayaran</h2>
              <div className="flex justify-between items-center mt-2 text-sm">
                <p>Metode Pembayaran</p>
                <p>Kartu Kredit</p>
              </div>

              <div className="flex justify-between items-center mt-4 text-sm">
                <p>
                  Total Harga (
                  {data?.products?.reduce((acc, item) => {
                    return acc + item.Checkout?.Cart?.quantity;
                  }, 0)}{" "}
                  Barang)
                </p>
                <p>{formatRupiah(data?.totalPrice)}</p>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <p>Total Ongkos Kirim</p>
                <p>{formatRupiah(data?.shipmentFee)}</p>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <p>Total Diskon Barang</p>
                <p>{data?.Checkout?.Cart?.Product?.discount || "-"}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 mb-3">
              <p className="font-semibold">Total Belanja</p>
              <p className="font-semibold">
                {formatRupiah(data?.totalPrice + data?.shipmentFee)}
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderDetail;

const OrderStatus = ({ currentStep, data }) => {
  return (
    <Steps progressDot current={currentStep} direction="vertical" size="small">
      {currentStep === 5 && (
        <Steps.Step
          title="Transaksi selesai"
          status={currentStep !== 5 ? "wait" : "process"}
          subTitle={
            <>
              <div className="text-xs mb-2">
                {formatDateOrder(new Date(data?.completedAt))} WIB
              </div>
            </>
          }
          description="Pemesanan selesai, Dana akan diteruskan ke penjual"
        />
      )}
      {(currentStep === 4 || currentStep === 5) && (
        <Steps.Step
          title="Pesanan telah tiba di tujuan"
          status={currentStep !== 4 ? "wait" : "process"}
          subTitle={
            <>
              <div className="text-xs mb-2">
                {formatDateOrder(new Date(data?.deliveredAt))} WIB
              </div>
            </>
          }
          description="Received by Aldrin Mursidi"
        />
      )}
      {(currentStep === 3 || currentStep === 4 || currentStep === 5) && (
        <Steps.Step
          title="Pesanan telah dikirim"
          status={currentStep !== 3 ? "wait" : "process"}
          subTitle={
            <>
              <div className="text-xs mb-2">
                {formatDateOrder(new Date(data?.prossessedAt))} WIB
              </div>
            </>
          }
          description="Pesanan Anda dalam proses pengiriman oleh kurir"
        />
      )}
      {(currentStep === 2 ||
        currentStep === 3 ||
        currentStep === 4 ||
        currentStep === 5) && (
        <Steps.Step
          title="Diproses penjual"
          status={currentStep !== 2 ? "wait" : "process"}
          subTitle={
            <>
              <div className="text-xs mb-2">
                {formatDateOrder(new Date(data?.confirmedAt))} WIB
              </div>
            </>
          }
          description="Pesanan sedang diproses oleh penjual"
        />
      )}
      {(currentStep === 1 ||
        currentStep === 2 ||
        currentStep === 3 ||
        currentStep === 4 ||
        currentStep === 5) && (
        <Steps.Step
          title="Pembayaran sudah diverifikasi"
          status={currentStep !== 1 ? "wait" : "process"}
          subTitle={
            <>
              <div className="text-xs mb-2">
                {formatDateOrder(new Date(data?.orderDate))} WIB
              </div>
            </>
          }
          description="Pembayaran telah diterima dan pesanan kamu sudah diteruskan ke penjual"
        />
      )}
    </Steps>
  );
};

const OrderProduct = ({ item }) => {
  return (
    <Card shadow="sm" className="p-2 mb-2">
      <CardBody>
        <div className="flex justify-between gap-x-2 items-center">
          <div className="flex gap-x-2 justify-start w-full">
            <Image
              src={`http://localhost:3000/${
                item?.Checkout?.Cart?.Product?.Images?.at(0)?.image
              }`}
              width={50}
            />
            <div className="flex flex-col text-sm">
              <p>{item?.Checkout?.Cart?.Product?.title}</p>
              <p className="text-gray-400">
                {item?.Checkout?.Cart?.quantity} x{" "}
                {formatRupiah(item?.Checkout?.Cart?.Product?.price)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-1 justify-end w-1/4 items-end">
            <p className="text-sm">Total Harga</p>
            <p className="text-sm font-semibold">
              {formatRupiah(
                item?.Checkout?.Cart?.quantity *
                  item?.Checkout?.Cart?.Product?.price
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-1 gap-x-2">
          <Button variant="solid" color="danger">
            Beli lagi
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

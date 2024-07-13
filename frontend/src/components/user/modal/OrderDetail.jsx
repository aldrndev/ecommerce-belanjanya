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

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success("No Resi berhasil disalin");
  });
};
const OrderDetail = () => {
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
                <OrderStatus currentStep={0} />
              </div>
            )}
            <Divider className="my-4" />
            <div>
              <div className="flex justify-between items-center mb-3">
                <h1 className="font-semibold">Detail Produk</h1>
                <p className="text-sm font-semibold">Aldrin Mursidi</p>
              </div>
              <OrderProduct />
              {isMore && <OrderProduct />}
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
            </div>
            <Divider className="my-4" />
            <div>
              <h2 className="font-semibold">Info Pengiriman</h2>
              <div>
                <table className="w-full text-sm mt-2">
                  <tbody>
                    <tr className="mb-4">
                      <td className="pr-14 pb-3">Kurir</td>
                      <td className="pb-3">JNE</td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-14 pb-3">No Resi</td>
                      <td className="pb-3">
                        <Tooltip title="Klik untuk menyalin">
                          <span
                            onClick={() => copyToClipboard("123456789")}
                            className="cursor-pointer"
                          >
                            123456789 <CopyOutlined className="ml-1" />
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-14">Alamat</td>
                      <td>Aldrin Mursidi</td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-14 pb-3"></td>
                      <td>628965412312</td>
                    </tr>
                    <tr className="mb-4">
                      <td className="pr-14 pb-3"></td>
                      <td>Jl. Kramat Jati, rt 1 rw 2 jakarta pusat 10420</td>
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
                <p>Total Harga (1 Barang)</p>
                <p>Rp195.000</p>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <p>Total Ongkos Kirim</p>
                <p>Rp30.000</p>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <p>Total Diskon Barang</p>
                <p>-Rp95.000</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 mb-3">
              <p className="font-semibold">Total Belanja</p>
              <p className="font-semibold">Rp120.000</p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderDetail;

const OrderStatus = ({ currentStep }) => {
  return (
    <Steps progressDot current={currentStep} direction="vertical" size="small">
      <Steps.Step
        title="Transaksi selesai"
        subTitle={
          <>
            <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
          </>
        }
        description="Pemesanan selesai, Dana akan diteruskan ke penjual"
      />
      <Steps.Step
        title="Pesanan telah tiba di tujuan"
        subTitle={
          <>
            <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
          </>
        }
        description="Received by Aldrin Mursidi"
      />
      <Steps.Step
        title="Pesanan telah dikirim"
        subTitle={
          <>
            <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
          </>
        }
        description="Pesanan Anda dalam proses pengiriman oleh kurir"
      />
      <Steps.Step
        title="Diproses penjual"
        subTitle={
          <>
            <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
          </>
        }
        description="Pesanan sedang diproses oleh penjual"
      />
      <Steps.Step
        title="Pembayaran sudah diverifikasi"
        subTitle={
          <>
            <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
          </>
        }
        description="Pembayaran telah diterima dan pesanan kamu sudah diteruskan ke penjual"
      />
    </Steps>
  );
};

const OrderProduct = () => {
  return (
    <Card shadow="sm" className="p-2 mb-2">
      <CardBody>
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <Image
              src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
              width={50}
            />
            <div className="flex flex-col text-sm">
              <p>Kerang Kempeng</p>
              <p className="text-gray-400">1 x Rp50000</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <p className="text-sm">Total Harga</p>
            <p className="text-sm font-semibold">Rp50.000</p>
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <Button variant="bordered" color="danger" className="w-1/4">
            Beli lagi
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

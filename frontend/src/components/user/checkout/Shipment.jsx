import {
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Divider, Empty } from "antd";
import { useState } from "react";
import { CiDiscount1 } from "react-icons/ci";

const Shipment = () => {
  const [isAddress, setIsAddress] = useState(false);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Pengiriman</h1>
      <div className="flex justify-between gap-x-5 mt-3">
        <div className="w-full">
          <div className="flex flex-col gap-y-1 shadow-small p-5 rounded-2xl">
            <p className="  text-gray-400">ALAMAT PENGIRIMAN</p>
            <div className="mt-2">
              <div className="flex gap-x-2">
                <UserOutlined />
                <span className="font-semibold">Aldrin Mursidi</span>
              </div>
              <div className="flex gap-x-2">
                <EnvironmentOutlined />
                <span>Jl. Jend. Sudirman No. 1 Jakarta Pusat</span>
              </div>
              <div className="flex gap-x-2">
                <PhoneOutlined />
                <span>081234567890</span>
              </div>
            </div>
            <div className="mt-3">
              <Button radius="full" onClick={() => setIsAddress(!isAddress)}>
                {isAddress ? "Batalkan" : "Ubah Alamat"}
              </Button>
            </div>
            {isAddress && (
              <div>
                <div className="flex justify-between gap-x-5 mb-5 mt-5">
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="Nama Penerima"
                    placeholder="Nama Penerima"
                  />
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="No Handphone"
                    placeholder="No Handphone"
                  />
                </div>
                <div className="flex justify-between gap-x-5 mb-5">
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="Provinsi"
                    placeholder="Provinsi"
                  />
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="Kota"
                    placeholder="Kota"
                  />
                </div>
                <div className="flex justify-between gap-x-5 mb-5">
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="Kecamatan"
                    placeholder="Kecamatan"
                  />
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="Kelurahan"
                    placeholder="Kelurahan"
                  />
                </div>
                <div className="flex justify-between gap-x-5 mb-5">
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="RT"
                    placeholder="RT"
                  />
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="RW"
                    placeholder="RW"
                  />
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="Kode Pos"
                    placeholder="Kode Pos"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="shadow-small p-5 rounded-2xl mt-3">
            <p className="  text-gray-400">PESANAN 1</p>
            <p className="font-semibold mt-2">Aldrin Mursidi</p>
            <div className="flex justify-between mt-2">
              <div className="flex gap-x-2">
                <Image
                  src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2024/1/19/82ade6d8-9276-4890-a57a-eeaf74115114.jpg"
                  width={80}
                />
                <div className="flex flex-col gap-y-1">
                  <p>IBOX APPLE MACBOOK 2024 PRO 14 M3 8C 8GB 1TB GPU 14.0</p>
                  <p className="text-gray-400 text-sm">Catatan</p>
                  <div className="mt-2">
                    <Select placeholder="Pilih Pengiriman" label="Pengiriman">
                      <SelectItem>Kurir Belanjanya</SelectItem>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold">1 x Rp1.200.000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-small rounded-xl p-5 w-1/3 h-full sticky top-40">
          <h1 className="text-lg font-semibold">Ringkasan Belanja</h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">Total Harga (3 Barang)</p>
            <p className="font-semibold">Rp1.200.000</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">Total Ongkos Kirim</p>
            <p className="font-semibold">Rp200.000</p>
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">Total Belanja</p>
            <p className="font-semibold">Rp200.000</p>
          </div>
          <Divider className="my-4" />
          <div>
            <PromoModal />
          </div>
          <Divider className="my-4" />
          <div className="mt-2">
            <Button color="danger" fullWidth>
              Pilih Pembayaran
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;

const PromoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        fullWidth
        variant="flat"
        color="success"
        size="lg"
      >
        <CiDiscount1 size={28} />
        Makin hemat pakai promo <RightOutlined />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pakai Promo
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    placeholder="Masukan kode promo"
                    isClearable
                    size="lg"
                  />
                </div>
                <div>
                  <Empty>Kamu belum memiliki kupon</Empty>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Pakai Promo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

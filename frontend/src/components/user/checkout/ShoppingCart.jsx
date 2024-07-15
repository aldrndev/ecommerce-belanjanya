import {
  Button,
  Checkbox,
  Divider,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  EditOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import CustomInputNumber from "../../CustomInputNumber";

import { CiDiscount1 } from "react-icons/ci";
import { Empty } from "antd";

const ShoppingCart = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Keranjang</h1>
      <div className="flex justify-between gap-x-5 mt-3">
        <div className="w-full">
          <div className="flex justify-between p-5  shadow-small rounded-xl">
            <div>
              <Checkbox>Pilih Semua (5)</Checkbox>
            </div>
            <div className="text-danger hover:text-red-700 cursor-pointer">
              Hapus
            </div>
          </div>
          <div className="p-5 shadow-small mt-3 rounded-xl">
            <CartList />
          </div>
        </div>
        <div className="shadow-small rounded-xl p-5 w-1/3 h-full sticky top-40">
          <h1 className="text-lg font-semibold">Ringkasan Belanja</h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">Total</p>
            <p className="font-semibold">Rp1.200.000</p>
          </div>
          <Divider className="my-4" />
          <div>
            <PromoModal />
          </div>
          <Divider className="my-4" />
          <div>
            <Button color="danger" fullWidth>
              Beli
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

const CartList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(1);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div>
        <Checkbox>Aldrin Store</Checkbox>
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <Checkbox>
            <div className="flex gap-x-3">
              <Image
                src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/12/19/822bcb9b-00d7-4f89-89f5-f3159d56f888.jpg"
                width={80}
              />
              <div className="flex flex-col">
                <p className="text-warning text-xs">Sisa 5</p>
                <p>Gaabor Vacuum Cleaner Multifungsi tanpa kabel Mini Vacuum</p>
                <p className="text-sm text-gray-500 mt-1">
                  Catatan: warna putih jangan lupa ya
                </p>
              </div>
            </div>
          </Checkbox>
        </div>
        <div className="flex flex-col gap-y-1 justify-end items-end">
          <div className="font-semibold">Rp139.000</div>
          <div className="line-through text-gray-400">Rp439.000</div>
          <div className="flex items-center gap-x-3">
            <Popover
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
              placement="bottom"
            >
              <PopoverTrigger>
                <Button isIconOnly size="md" variant="light">
                  <EditOutlined className="text-xl text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-2 w-[300px]">
                  <Input placeholder="Masukan catatan" label="Catatan" />
                  <div className="mt-3 flex gap-x-3">
                    <Button size="sm">Batal</Button>
                    <Button size="sm" color="danger">
                      Simpan
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <HeartOutlined className="text-xl text-gray-500 cursor-pointer" />
            <DeleteOutlined className="text-xl text-gray-500 cursor-pointer" />

            <CustomInputNumber
              width={"w-16"}
              value={value}
              onChange={handleInputChange}
              startContent={
                <button onClick={() => setValue(value - 1)}>-</button>
              }
              endContent={
                <button onClick={() => setValue(value + 1)}>+</button>
              }
            />
          </div>
        </div>
      </div>
      <Divider className="my-4" />
    </div>
  );
};

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

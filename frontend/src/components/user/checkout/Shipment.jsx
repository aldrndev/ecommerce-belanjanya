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
import { useEffect, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import Footer from "../../Footer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addOrder,
  addShipmentInfo,
  fetchCheckout,
  fetchShipmentInfo,
} from "../../../../api/user";
import { MdVerified } from "react-icons/md";
import { formatRupiah } from "../../../../utils/formatCurrency";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Shipment = () => {
  const [isAddress, setIsAddress] = useState(false);
  const [total, setTotal] = useState(0);
  const [shipmentFee, setShipmentFee] = useState({});
  const [totalShipment, setTotalShipment] = useState(0);
  const [couriers, setCouriers] = useState({});
  const [seller, setSeller] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["checkout"],
    queryFn: fetchCheckout,
  });

  const { data: dataShipment, isPending: pendingDataShipment } = useQuery({
    queryKey: ["shipment"],
    queryFn: fetchShipmentInfo,
  });

  useEffect(() => {
    if (data) {
      const total = data?.beforeGroup?.reduce((acc, item) => {
        return acc + item.Cart.quantity * item.Cart.Product.price;
      }, 0);
      setTotal(total);
    }
  }, [data]);

  const handleShipment = (e, sellerId) => {
    const { value } = e.target;
    let fee = 0;
    let courier = "";
    if (Number(value) === 1) {
      fee = Number(50000);
      courier = "Belanjanya";
    } else if (Number(value) === 2) {
      fee = Number(100000);
      courier = "JNE";
    }
    setShipmentFee((prev) => ({
      ...prev,
      [sellerId]: fee,
    }));
    setCouriers((prev) => ({
      ...prev,
      [sellerId]: courier,
    }));
  };

  useEffect(() => {
    const totalFee = Object.values(shipmentFee).reduce(
      (acc, item) => acc + item,
      0
    );
    setTotalShipment(totalFee);
  }, [shipmentFee]);

  const { mutate: mutateAddShipmentInfo, isPending: pendingShipmentInfo } =
    useMutation({
      mutationFn: addShipmentInfo,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["shipment"] });
        setIsAddress(false);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmit = (data) => {
    const {
      address,
      province,
      city,
      district,
      subDistrict,
      rt,
      rw,
      postalCode,
      receiver,
      phone,
    } = data;

    const newAddress = `${address}, rt ${rt} rw ${rw}, kelurahan ${district}, kecamatan ${subDistrict}, ${city}, ${province}, ${postalCode}`;

    mutateAddShipmentInfo({
      receiver,
      phone,
      address: newAddress,
    });
  };

  const { mutate: mutateAddOrder, isPending: pendingAddOrder } = useMutation({
    mutationFn: addOrder,
    onSuccess: (order) => {
      toast.success(order.message);
      navigate("/order", { state: { data } });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddOrder = () => {
    const allCouriersSelected = data?.data?.every(
      (item) => couriers[item.sellerId]
    );
    if (!allCouriersSelected) {
      toast.error("Harap pilih kurir untuk semua pesanan.");
      return;
    }

    mutateAddOrder({
      checkoutId: data?.beforeGroup?.map((item) => item.id),
      totalPrice: total + totalShipment,
      courier: couriers,
      sellerId: data?.data?.map((item) => item.sellerId),
      shipmentId: dataShipment?.id,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Pengiriman</h1>
      {data?.data.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Empty />
          <p>Belum ada pesanan yang diterima</p>
        </div>
      ) : (
        <div className="flex justify-between gap-x-5 mt-3">
          <div className="w-full">
            <div className="flex flex-col gap-y-1 shadow-small p-5 rounded-2xl">
              <p className="  text-gray-400">ALAMAT PENGIRIMAN</p>
              {dataShipment && (
                <div className="mt-2 capitalize">
                  <div className="flex gap-x-2">
                    <UserOutlined />
                    <span className="font-semibold">
                      {dataShipment?.receiver}
                    </span>
                  </div>
                  <div className="flex gap-x-2">
                    <EnvironmentOutlined />
                    <span>{dataShipment?.address}</span>
                  </div>
                  <div className="flex gap-x-2">
                    <PhoneOutlined />
                    <span>{dataShipment?.phone}</span>
                  </div>
                </div>
              )}
              <div className="mt-3">
                <Button radius="full" onClick={() => setIsAddress(!isAddress)}>
                  {!dataShipment && !isAddress
                    ? "Masukkan data pengiriman"
                    : isAddress
                    ? "Batalkan"
                    : "Ubah Alamat"}
                </Button>
              </div>
              {isAddress && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="flex justify-between gap-x-5 mb-5 mt-5">
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Nama Penerima"
                        placeholder="Nama Penerima"
                        {...register("receiver", { required: true })}
                      />
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="No Handphone"
                        placeholder="No Handphone"
                        {...register("phone", { required: true })}
                      />
                    </div>
                    <div className="flex justify-between gap-x-5 mb-5">
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Alamat Penerima"
                        placeholder="Alamat Penerima"
                        {...register("address", { required: true })}
                      />
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Provinsi"
                        placeholder="Provinsi"
                        {...register("province", { required: true })}
                      />
                    </div>
                    <div className="flex justify-between gap-x-5 mb-5">
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Kota/Kabupaten"
                        placeholder="Kota/Kabupaten"
                        {...register("city", { required: true })}
                      />
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Kecamatan"
                        placeholder="Kecamatan"
                        {...register("district", { required: true })}
                      />
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Kelurahan"
                        placeholder="Kelurahan"
                        {...register("subDistrict", { required: true })}
                      />
                    </div>
                    <div className="flex justify-between gap-x-5 mb-5">
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="RT"
                        placeholder="RT"
                        {...register("rt", { required: true })}
                      />
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="RW"
                        placeholder="RW"
                        {...register("rw", { required: true })}
                      />
                      <Input
                        labelPlacement="outside"
                        isRequired
                        label="Kode Pos"
                        placeholder="Kode Pos"
                        {...register("postalCode", { required: true })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        loading={pendingShipmentInfo}
                        className="w-1/5"
                        radius="lg"
                        color="danger"
                      >
                        Simpan
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            {data?.data?.map((item, index) => (
              <div className="shadow-small p-5 rounded-2xl mt-3" key={index}>
                <p className="  text-gray-400">PESANAN {index + 1}</p>
                <div className="flex gap-x-2 items-center ml-1 mt-2">
                  <MdVerified className="text-danger" size={20} />
                  <p className="font-semibold capitalize">{item.sellerName}</p>
                </div>
                {item.carts.map((product) => (
                  <div
                    className="flex justify-between mt-4 items-center"
                    key={product.id}
                  >
                    <div className="flex gap-x-2 items-center">
                      <div className="w-20 h-20 flex justify-center items-center">
                        <Image
                          src={`http://localhost:3000/${product.Cart.Product.Images[0].image}`}
                          width={80}
                          height={80}
                          alt={product.Cart.Product.title}
                        />
                      </div>
                      <div className="flex flex-col gap-y-1 flex-1">
                        <p>{product.Cart.Product.title}</p>
                        <p className="text-gray-400 text-sm">
                          Catatan: {product.Cart.note || "Tidak ada catatan"}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                      <p className="font-semibold">
                        {product.Cart.quantity} x{" "}
                        {formatRupiah(product.Cart.Product.price)}
                      </p>
                    </div>
                  </div>
                ))}
                <Divider className="my-4" />
                <div className="mt-4 flex justify-end w-1/2 ml-auto">
                  <Select
                    required
                    placeholder="Pilih Pengiriman"
                    label="Pengiriman"
                    onChange={(e) => handleShipment(e, item.sellerId)}
                  >
                    <SelectItem key={1}>Kurir Belanjanya</SelectItem>
                    <SelectItem key={2}>JNE</SelectItem>
                  </Select>
                </div>
              </div>
            ))}
          </div>
          <div className="shadow-small rounded-xl p-5 w-1/3 h-full sticky top-40">
            <h1 className="text-lg font-semibold">Ringkasan Belanja</h1>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500">
                Total Harga ({data?.beforeGroup?.length || 0})
              </p>
              <p className="font-semibold">{}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500">Total Ongkos Kirim</p>
              <p className="font-semibold">{formatRupiah(totalShipment)}</p>
            </div>
            <Divider className="my-4" />
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500">Total Belanja</p>
              <p className="font-semibold">
                {(total &&
                  totalShipment !== 0 &&
                  formatRupiah(total + totalShipment)) ||
                  0}
              </p>
            </div>
            <Divider className="my-4" />
            <div>
              <PromoModal />
            </div>
            <Divider className="my-4" />
            <div className="mt-2">
              <Button color="danger" fullWidth onClick={() => handleAddOrder()}>
                Pesan Sekarang
                {/* Pilih Pembarayan */}
              </Button>
            </div>
          </div>
        </div>
      )}
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

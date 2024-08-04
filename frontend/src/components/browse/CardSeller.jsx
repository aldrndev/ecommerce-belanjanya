import { Button, Card, CardBody, Image, input, Input } from "@nextui-org/react";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiLocationOn, CiShare2 } from "react-icons/ci";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import CustomInputNumber from "../CustomInputNumber";
import { formatRupiah } from "../../../utils/formatCurrency";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCart } from "../../../api/user";
import toast, { ToastBar } from "react-hot-toast";
import { MdVerified } from "react-icons/md";

const CardSeller = ({ product }) => {
  const [isNote, setIsNote] = useState("false");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue: setValueForm,
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });
  const handleNoteClick = () => {
    setIsNote(!isNote);
  };
  const [value, setValue] = useState(1);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setValue("");
    } else if (inputValue > 0) {
      setValue(+inputValue);
      setValueForm("quantity", +inputValue);
    }
  };

  const handleBlur = () => {
    if (value === "" || value <= 0) {
      setValue(1);
    }
  };

  const subTotalPrice = value * product?.price;

  const { mutate, isPending } = useMutation({
    mutationFn: addCart,
    onSuccess: (data) => {
      toast.custom(
        (t) => (
          <CustomToast
            t={t}
            product={product}
            quantity={value}
            totalPrice={subTotalPrice}
            message={data.message}
          />
        ),
        {
          duration: 2000,
          style: {
            maxWidth: "500px",
          },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, productId: product?.id });
  };

  useEffect(() => {
    if (isNote) {
      setValueForm("note", "");
    }
  }, [isNote]);

  return (
    <Card shadow="sm">
      <CardBody>
        <div>
          <h1 className="font-semibold">Atur jumlah</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3 flex justify-between gap-3">
              <CustomInputNumber
                width={"w-full"}
                handleBlur={handleBlur}
                value={value}
                onChange={handleInputChange}
                startContent={
                  <button
                    type="button"
                    onClick={() => {
                      const newValue = value > 1 ? value - 1 : 1;
                      setValue(newValue);
                      setValueForm("quantity", newValue);
                    }}
                  >
                    -
                  </button>
                }
                endContent={
                  <button
                    type="button"
                    onClick={() => {
                      const newValue = value + 1;
                      setValue(newValue);
                      setValueForm("quantity", newValue);
                    }}
                  >
                    +
                  </button>
                }
              />
              <div className="w-full flex items-center">
                <p className="text-sm">Stock Total: {product?.stock}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link onClick={handleNoteClick} variant="light">
                <div className="flex items-center gap-2 text-danger text-sm">
                  <GoPencil />
                  {isNote ? "Tambahkan catatan" : "Hapus catatan"}
                </div>
              </Link>
              {!isNote && (
                <div className="mt-2">
                  <Input
                    placeholder="Contoh: warna putih"
                    {...register("note")}
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-base">Subtotal</p>
              <p className="font-semibold">{formatRupiah(subTotalPrice)}</p>
            </div>
            <div className="mt-4 flex flex-col gap-2 mb-6">
              <Button color="danger" type="submit">
                + Keranjang
              </Button>
              <Button color="danger" variant="bordered">
                Beli Langsung
              </Button>
            </div>
          </form>
          <Divider className="my-4" />
          <div>
            <h1 className="font-semibold">Informasi Penjual</h1>
            <div className="flex gap-3 mt-3 items-center">
              <div className="w-[60px]">
                <Image
                  src={`http://localhost:3000/${product?.Seller?.image}`}
                  radius="full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-x-1 items-center">
                  <MdVerified className="text-danger" />
                  <p className="text-sm capitalize">{product?.Seller?.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaStar className="text-yellow-400" />
                  4.9 (100 rating)
                </div>
                <div className="flex items-center gap-2 text-sm capitalize">
                  <CiLocationOn />
                  {product?.Seller?.city.toLowerCase()}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <IoChatboxEllipsesOutline />
              Chat
            </div>
            {"|"}
            <div className="flex items-center gap-2">
              <HeartOutlined />
              Wishlist
            </div>
            {"|"}
            <div className="flex items-center gap-2">
              <CiShare2 />
              Bagikan
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardSeller;

export const CustomToast = ({ t, product, quantity, totalPrice, message }) => {
  return (
    <ToastBar toast={t}>
      {({ icon }) => (
        <>
          <div className="p-2">
            <div className="flex justify-center items-center mb-4 text-success font-semibold">
              <p>{message}</p>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src={`http://localhost:3000/${product?.Images[0]?.image}`}
                  alt={product?.title}
                  className="w-[120px] rounded"
                />
              </div>
              <div>
                <p className="font-bold">
                  {product?.title.length > 70
                    ? product?.title.slice(0, 70) + "..."
                    : product?.title}
                </p>
                <p>Quantity: {quantity}</p>
                <p>Total Price: {formatRupiah(totalPrice)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </ToastBar>
  );
};

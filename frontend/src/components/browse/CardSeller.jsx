import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiLocationOn, CiShare2 } from "react-icons/ci";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import CustomInputNumber from "../CustomInputNumber";
import { formatRupiah } from "../../../utils/formatCurrency";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCart,
  addCheckout,
  addWishlist,
  fetchWishlist,
  removeWishlist,
} from "../../../api/user";
import toast, { ToastBar } from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import AuthPage from "../AuthPage";
import Login from "../auth/Login";
import Register from "../auth/Register";

const CardSeller = ({ product, isLogin, isNote, setIsNote }) => {
  const [noted, setNoted] = useState("");
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (product?.price) {
      setSubTotalPrice(
        product?.discount
          ? value * (product?.price - product?.discount)
          : value * product?.price
      );
    }
  }, [value]);

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
          duration: 3000,
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
    if (isLogin) {
      mutate({ ...data, productId: product?.id, isDirect: false });
    }
  };

  const { mutate: addCheckoutDirect, isPending: pendingDirectCheckout } =
    useMutation({
      mutationFn: addCheckout,
    });

  const { mutate: addCartDirect, isPending: pendingCartDirect } = useMutation({
    mutationFn: addCart,
    onSuccess: (data) => {
      addCheckoutDirect([data.data.id]);
      navigate("/shipment");
    },
  });

  const handleDirectBuy = () => {
    if (isLogin) {
      addCartDirect({
        productId: product?.id,
        quantity: value,
        note: noted,
        isDirect: true,
      });
    }
  };

  useEffect(() => {
    if (isNote) {
      setValueForm("note", "");
    }
  }, [isNote]);

  const { mutate: mutateAddWishlist, isPending: pendingAddWishlist } =
    useMutation({
      mutationFn: addWishlist,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { data: wishlistData, isPending: pendingGetWishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    enabled: isLogin,
  });

  const handleWishlist = (id) => {
    mutateAddWishlist(id);
  };

  const { mutate: removeWishlistMutate, isPending: pendingRemoveWishlist } =
    useMutation({
      mutationFn: removeWishlist,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleRemoveWishlist = (id) => {
    removeWishlistMutate(id);
  };

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
              <div onClick={handleNoteClick} variant="light">
                <div className="flex items-center gap-2 text-danger text-sm">
                  <GoPencil />
                  {isNote ? "Tambahkan catatan" : "Hapus catatan"}
                </div>
              </div>
              {!isNote && (
                <div className="mt-2">
                  <Input
                    placeholder="Contoh: warna putih"
                    {...register("note")}
                    onValueChange={setNoted}
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-base">Subtotal</p>
              <p className="font-semibold">
                {subTotalPrice ? formatRupiah(subTotalPrice) : product?.price}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2 mb-6">
              {isLogin ? (
                <div>
                  <Button color="danger" type="submit" fullWidth>
                    + Keranjang
                  </Button>
                </div>
              ) : (
                <div>
                  <AuthPageCart />
                </div>
              )}
              <Button
                color="danger"
                variant="bordered"
                onClick={handleDirectBuy}
              >
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
                  {product?.Seller?.city?.toLowerCase()}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm items-center">
            <div className="flex items-center gap-2">
              <IoChatboxEllipsesOutline />
              Chat
            </div>
            {"|"}
            {isLogin ? (
              <div
                className="flex justify-end cursor-pointer"
                onClick={
                  wishlistData?.find((item) => item.ProductId === product?.id)
                    ? () => handleRemoveWishlist(product?.id)
                    : () => handleWishlist(product?.id)
                }
              >
                {wishlistData?.find(
                  (item) => item.ProductId === product?.id
                ) ? (
                  <div className="flex gap-x-2 items-center">
                    <HeartFilled className="text-danger" />
                    Wishlist
                  </div>
                ) : (
                  <div className="flex gap-x-2 items-center">
                    <HeartOutlined />
                    Wishlist
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <AuthPage iconAuth={true} iconName={<HeartOutlined />} />
              </div>
            )}
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

const AuthPageCart = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [stepLogin, setStepLogin] = useState(1);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleNextLogin = (value) => {
    setStepLogin(stepLogin + value);
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="solid" fullWidth>
        + Keranjang
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="4xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col w-full mt-5 p-5">
              <Tabs
                size="lg"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
                variant="solid"
                className="mb-3 mx-auto max-w-lg"
                radius="full"
                fullWidth
              >
                <Tab key="login" title="Login">
                  <Login
                    onOpenChange={onOpenChange}
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                    stepLogin={stepLogin}
                    handleNextLogin={handleNextLogin}
                    setSelected={setSelected}
                    handleNext={handleNext}
                  />
                </Tab>
                <Tab key="sign-up" title="Daftar">
                  <Register
                    onOpenChange={onOpenChange}
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                    step={step}
                    handleNext={handleNext}
                    setSelected={setSelected}
                    handleNextLogin={handleNextLogin}
                  />
                </Tab>
              </Tabs>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

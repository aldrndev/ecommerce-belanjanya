import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
} from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";

import "swiper/css";

import { formatRupiah } from "../../utils/formatCurrency";
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductByLocation } from "../../api/public";
import { Link, useSearchParams } from "react-router-dom";
import { Empty } from "antd";
import { addWishlist, fetchWishlist, removeWishlist } from "../../api/user";
import toast from "react-hot-toast";
import AuthPage from "./AuthPage";
import { useEffect, useState } from "react";

const ProductByLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location");
  const isLogin = localStorage.getItem("isLogin") === "true";

  const [city, setCity] = useState("");

  const handleCity = (value) => {
    setCity(value);
  };
  const cityHandler = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ location: city });
    }
  };

  useEffect(() => {
    if (!city) {
      searchParams.delete("location");
      setSearchParams(searchParams);
    }
  }, [city]);

  const { data, isPending: pendingProduct } = useQuery({
    queryKey: ["products", location],
    queryFn: () => fetchProductByLocation(location),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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
    mutate(id);
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
    <div className="bg-gray-100 rounded-3xl p-10">
      <div className="flex justify-between items-center">
        <div className="mb-10 flex justify-start gap-x-5 w-full">
          <h1 className="text-2xl font-semibold flex justify-center items-center">
            Produk terbaru di dekatmu
          </h1>
          <Input
            placeholder="Masukan kota kamu.."
            variant="bordered"
            size="lg"
            className="w-1/2"
            startContent={<CiLocationOn size={20} />}
            onKeyDown={cityHandler}
            onValueChange={handleCity}
            value={city}
            isClearable
          />
        </div>
        <div className="flex justify-end w-1/2 mb-10">
          <Link
            to={`/product${location ? `?location=${location}` : ""}`}
            className="text-danger hover:text-red-700 underline "
          >
            Lihat Produk Lainnya
          </Link>
        </div>
      </div>
      <div>
        <Swiper slidesPerView={4} spaceBetween={30}>
          {data?.length === 0 ? (
            <div className="flex justify-center items-center flex-col gap-y-2 p-10">
              <Empty />
              <p>Tidak ada produk yang di temukan</p>
            </div>
          ) : (
            data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductCard
                    product={item}
                    handleRemoveWishlist={handleRemoveWishlist}
                    handleWishlist={handleWishlist}
                    wishlistData={wishlistData}
                    isLogin={isLogin}
                  />
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductByLocation;

const ProductCard = ({
  product,
  wishlistData,
  handleRemoveWishlist,
  handleWishlist,
  isLogin,
}) => {
  return (
    <Card shadow="none" className="h-[430px]">
      <CardBody className="overflow-visible rounded-2xl">
        <div>
          <Link
            to={`/${product?.Seller?.name
              .toLowerCase()
              .replace(" ", "")}/${product?.title
              .toLowerCase()
              .replace(/[-\s]+/g, "-")
              .replace(/\//g, "-")}`}
            state={{ product }}
          >
            <Image
              shadow="sm"
              radius="lg"
              width={"100%"}
              alt={product?.title}
              src={`http://localhost:3000/${product?.Images?.at(0).image}`}
              className="w-full object-contain h-[220px]"
              isZoomed
            />
          </Link>
        </div>
      </CardBody>
      <CardFooter className="h-full">
        <div className="flex flex-col gap-2 w-full p-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-start">
              <Link
                to={`/${product?.Seller?.name
                  .toLowerCase()
                  .replace(" ", "")}/${product?.title
                  .toLowerCase()
                  .replace(/[-\s]+/g, "-")
                  .replace(/\//g, "-")}`}
                state={{ product }}
              >
                <b>
                  {product?.title.length >= 35
                    ? product?.title.slice(0, 35) + "..."
                    : product?.title}
                </b>
              </Link>
            </div>
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
                  <HeartFilled className="text-danger" />
                ) : (
                  <HeartOutlined />
                )}
              </div>
            ) : (
              <AuthPage iconAuth={true} iconName={<HeartOutlined />} />
            )}
          </div>
          <p className="text-default-500">{formatRupiah(product?.price)}</p>
          <div className="flex items-center gap-1">
            <EnvironmentOutlined />
            <p className="capitalize">{product?.location?.toLowerCase()}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <FaStar className="text-yellow-400" />
              <span>4.9</span>
              <p>| 100+ terjual</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";

import "swiper/css";
// import "swiper/css/pagination";

import { formatRupiah } from "../../utils/formatCurrency";
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByLocation } from "../../api/public";
import { Link, useSearchParams } from "react-router-dom";
import { Empty } from "antd";

const ProductByLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location");

  const cityHandler = (value) => {
    if (value) {
      setSearchParams({ location: value });
    } else {
      searchParams.delete("location");
      setSearchParams(searchParams);
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["products", location],
    queryFn: () => fetchProductByLocation(location),
  });

  return (
    <div className="bg-gray-100 rounded-3xl p-10">
      <div className="flex justify-between items-center">
        <div className="mb-10 flex justify-start gap-x-5 w-full">
          <h1 className="text-2xl font-semibold flex justify-center items-center">
            Produk terbaru di dekatmu
          </h1>
          <Autocomplete
            placeholder="Pilih lokasimu..."
            variant="bordered"
            startContent={<CiLocationOn className="text-xl" />}
            className="max-w-xs"
            label="Kota"
            isClearable
            onSelectionChange={cityHandler}
          >
            <AutocompleteItem key="KABUPATEN SIMEULUE">
              KABUPATEN SIMEULUE
            </AutocompleteItem>
          </Autocomplete>
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
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          // modules={[Pagination]}
          // pagination={{ clickable: true, dynamicBullets: true }}
          // className="h-[450px]"
        >
          {data?.length === 0 ? (
            <Empty className="p-20" />
          ) : (
            data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductCard product={item} />
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

const ProductCard = ({ product }) => {
  return (
    <Card shadow="none">
      <CardBody className="overflow-visible rounded-2xl ">
        <div>
          <Link
            to={`/${product?.Seller?.name
              .toLowerCase()
              .replace(" ", "")}/${product?.title
              .toLowerCase()
              .replaceAll(" ", "-")}?id=${product?.id}`}
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
        <div className="flex justify-start flex-col gap-2 w-full p-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-start">
              <Link
                to={`/${product?.Seller?.name
                  .toLowerCase()
                  .replace(" ", "")}/${product?.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}?id=${product?.id}`}
              >
                <b>{product?.title}</b>
              </Link>
            </div>
            <div className="flex justify-end">
              <HeartOutlined />
            </div>
          </div>
          <p className="text-default-500">{formatRupiah(product?.price)}</p>
          <div className="flex items-center gap-1">
            <EnvironmentOutlined />
            {product?.location}
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

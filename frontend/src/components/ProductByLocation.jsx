import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";

import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";

const ProductByLocation = () => {
  const list = [
    {
      title: "Orange",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$12.20",
    },
  ];
  return (
    <div className="bg-gray-100 rounded-3xl p-10">
      <div className="mb-10 flex gap-x-5">
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
        >
          <AutocompleteItem>Indonesia</AutocompleteItem>
        </Autocomplete>
      </div>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-[520px]"
        >
          {list.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductCard product={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductByLocation;

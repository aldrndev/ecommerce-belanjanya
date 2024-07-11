import { useEffect } from "react";
import ProductCard from "../ProductCard";
import CardLayout from "./CardLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import { Pagination } from "@nextui-org/react";

const WishlistPage = () => {
  useEffect(() => {
    AOS.init({ duration: 500, easing: "linear" });
  }, []);
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
    <div>
      <CardLayout>
        <div className="grid grid-cols-4 gap-5">
          {list.map((item, index) => {
            return (
              <div data-aos="zoom-in" key={index}>
                <ProductCard product={item} />
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center items-center">
          <Pagination
            isCompact
            showControls
            total={10}
            initialPage={1}
            color="danger"
          />
        </div>
      </CardLayout>
    </div>
  );
};

export default WishlistPage;

import React from "react";
import ProductCard from "../ProductCard";

const RecommendProduct = () => {
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
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">Produk lainnya untukmu</h1>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {list.map((item, index) => {
          return <ProductCard key={index} product={item} />;
        })}
      </div>
    </div>
  );
};

export default RecommendProduct;

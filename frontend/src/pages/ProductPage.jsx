import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/browse/Sidebar";
import { Select, SelectItem } from "@nextui-org/react";
import ProductCard from "../components/ProductCard";
import { Pagination } from "@nextui-org/react";
import Footer from "../components/Footer";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const ProductPage = () => {
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
  const [currentPage, setCurrentPage] = useState("song");
  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="flex gap-5 mt-48">
          <div className="bg-white shadow-lg flex w-[300px] h-full sticky top-48">
            <Sidebar />
          </div>
          <div className="flex-1 flex-grow">
            <div className="flex justify-between">
              <div className="flex justify-start items-center">
                <Breadcrumbs
                  underline="active"
                  onAction={(key) => setCurrentPage(key)}
                >
                  <BreadcrumbItem key="home" isCurrent={currentPage === "home"}>
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    key="music"
                    isCurrent={currentPage === "music"}
                  >
                    Music
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    key="artist"
                    isCurrent={currentPage === "artist"}
                  >
                    Artist
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    key="album"
                    isCurrent={currentPage === "album"}
                  >
                    Album
                  </BreadcrumbItem>
                  <BreadcrumbItem key="song" isCurrent={currentPage === "song"}>
                    Song
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
              <div className="flex justify-end w-[200px]">
                <Select label="Urutkan" size="sm">
                  <SelectItem value={"dog"}>Terbaru</SelectItem>
                  <SelectItem value={"dog"}>Termurah</SelectItem>
                  <SelectItem value={"dog"}>Termahal</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {list.map((item, index) => {
                return <ProductCard key={index} product={item} />;
              })}
            </div>
            <div className="mt-12 flex justify-center items-center">
              <Pagination
                isCompact
                showControls
                total={10}
                initialPage={1}
                color="danger"
              />
            </div>
          </div>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

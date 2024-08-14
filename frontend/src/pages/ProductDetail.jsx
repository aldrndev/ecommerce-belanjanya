import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import ImageProduct from "../components/browse/ImageProduct";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import CardSeller from "../components/browse/CardSeller";
import ReviewDiscussionPage from "../components/browse/ReviewDiscussionPage";
import RecommendProduct from "../components/browse/RecommendProduct";
import FloatChat from "../components/user/chat/FloatChat";
import { useLocation, useNavigate } from "react-router-dom";
import { formatRupiah } from "../../utils/formatCurrency";
import { useState } from "react";

const ProductDetail = () => {
  const { state } = useLocation();
  const { product } = state || {};

  const isLogin = localStorage.getItem("isLogin") === "true";

  const [isDescription, setIsDescription] = useState(false);

  const description =
    product?.description?.length >= 200
      ? product?.description.slice(0, 200) + "..."
      : product?.description;

  const navigate = useNavigate();

  const pressHandler = (value) => {
    if (value === "home") {
      navigate("/");
    } else if (value === "product") {
      navigate("/product");
    }
  };

  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="mt-40">
          <Breadcrumbs underline="active" className="capitalize">
            <BreadcrumbItem key="home" onPress={() => pressHandler("home")}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem
              key="product"
              onPress={() => pressHandler("product")}
            >
              Product
            </BreadcrumbItem>
            <BreadcrumbItem key={product?.title} isCurrent>
              {product?.title}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="mt-4 p-8 bg-gray-100 rounded-xl flex justify-between gap-8">
          <div className="w-full">
            <ImageProduct images={product?.Images} />
          </div>
          <div className="w-full">
            <h1 className="text-xl font-bold">{product?.title}</h1>
            <div className="flex justify-between mt-3">
              <p>Terjual 450</p>
              {"|"}
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                4.9 (100 rating)
              </div>
              {"|"}
              <p>Diskusi (11)</p>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold">
                {formatRupiah(product?.price)}
              </h1>
              {product?.discount !== 0 && (
                <div className="flex items-center gap-x-2 mt-1">
                  <Chip color="warning" size="sm" radius="sm">
                    -70%
                  </Chip>
                  <span className="line-through text-gray-500">Rp250.000</span>
                </div>
              )}
            </div>
            <Divider className="my-4" />
            <div className="mt-5 text-sm flex gap-2 flex-col">
              <p>Kategori: {product?.ChildrenSubCategory?.title}</p>
              <p>Kondisi: {product?.condition}</p>
              <p>Merek: {product?.brand}</p>
              <p>Berat: {product?.weight} Gram</p>
            </div>
            <div className="mt-8 mb-8">
              <h1 className="text-lg font-bold">Deskripsi</h1>
              <p className="mt-2 whitespace-pre-wrap break-all">
                {isDescription ? product?.description : description}
              </p>
              {product?.description.length >= 200 && (
                <span
                  className="cursor-pointer text-danger"
                  onClick={() => setIsDescription(!isDescription)}
                >
                  {isDescription
                    ? " Lihat Lebih Sedikit"
                    : " Lihat Selengkapnya"}
                </span>
              )}
            </div>
          </div>
          <div className="w-3/5">
            <div className="sticky top-40">
              <CardSeller product={product} isLogin={isLogin} />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ReviewDiscussionPage />
        </div>
        <div className="mt-5">
          <RecommendProduct />
        </div>
        <div>
          <FloatChat />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;

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
import { useEffect, useState } from "react";
import FloatChat from "../components/user/chat/FloatChat";
import { fetchProductById } from "../../api/public";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { formatRupiah } from "../../utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const { data, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const [currentPage, setCurrentPage] = useState("");

  const description = data?.description;
  if (description?.length > 100) {
    description.slice(0, 100);
  }

  const navigate = useNavigate();

  const pressHandler = (value) => {
    if (value === "home") {
      navigate("/");
    } else if (value === "product") {
      navigate("/product");
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentPage(data?.title);
    }
  }, [data]);

  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="mt-40">
          <Breadcrumbs
            underline="active"
            onAction={(key) => setCurrentPage(key)}
            className="capitalize"
          >
            <BreadcrumbItem
              key="home"
              isCurrent={currentPage === "home"}
              onPress={() => pressHandler("home")}
            >
              Home
            </BreadcrumbItem>
            <BreadcrumbItem
              key="product"
              isCurrent={currentPage === "product"}
              onPress={() => pressHandler("product")}
            >
              Product
            </BreadcrumbItem>
            <BreadcrumbItem
              key={data?.title}
              isCurrent={currentPage === data?.title}
            >
              {data?.title}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="mt-4 p-8 bg-gray-100 rounded-xl flex justify-between gap-8">
          <div className="w-full">
            <ImageProduct images={data?.Images} />
          </div>
          <div className="w-full">
            <h1 className="text-xl font-bold">{data?.title}</h1>
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
                {formatRupiah(data?.price)}
              </h1>
              <Chip color="warning" size="sm" radius="sm">
                -70%
              </Chip>
              <span className="line-through text-gray-500 ml-2">Rp250.000</span>
            </div>
            <Divider className="my-4" />
            <div className="mt-5 text-sm flex gap-2 flex-col">
              <p>Kategori: {data?.ChildrenSubCategory?.title}</p>
              <p>Kondisi: {data?.condition}</p>
              <p>Merek: {data?.brand}</p>
              <p>Berat: {data?.weight} Gram</p>
            </div>
            <div className="mt-8 mb-8">
              <h1 className="text-lg font-bold">Deskripsi</h1>
              <p className="mt-2 text-base">{data?.description}</p>
            </div>
          </div>
          <div className="w-3/5">
            <div className="sticky top-40">
              <CardSeller product={data} />
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

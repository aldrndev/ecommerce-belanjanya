import { BreadcrumbItem, Breadcrumbs, Chip, Divider } from "@nextui-org/react";
import ImageProduct from "../components/browse/ImageProduct";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import CardSeller from "../components/browse/CardSeller";
import ReviewDiscussionPage from "../components/browse/ReviewDiscussionPage";
import RecommendProduct from "../components/browse/RecommendProduct";
import FloatChat from "../components/user/chat/FloatChat";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatRupiah } from "../../utils/formatCurrency";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDiscussionPublic,
  fetchProductMore,
  fetchSlugProduct,
} from "../../api/public";

const ProductDetail = () => {
  const { state } = useLocation();
  const { product } = state || {};

  const { seller, title } = useParams();

  const { data: productData, isPending: isPendingProduct } = useQuery({
    queryKey: ["slug", seller, title],
    queryFn: () => fetchSlugProduct(seller, title),
    enabled: !state,
  });

  const isLogin = localStorage.getItem("isLogin") === "true";

  const [isDescription, setIsDescription] = useState(false);
  const [isNote, setIsNote] = useState("false");

  const description =
    product?.description?.length >= 200 ||
    productData?.data?.Product?.description.length >= 200
      ? product?.description.slice(0, 200) + "..." ||
        productData?.data?.Product?.description.slice(0, 200) + "..."
      : product?.description || productData?.data?.Product?.description;

  const navigate = useNavigate();

  const pressHandler = (value) => {
    if (value === "home") {
      navigate("/");
    } else if (value === "product") {
      navigate("/product");
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["discussion", product?.id || productData?.data?.Product?.id],
    queryFn: () =>
      fetchDiscussionPublic(product?.id || productData?.data?.Product?.id),
    enabled: !!(state || productData),
  });

  const { data: moreProduct, isPending: pendingMoreProduct } = useQuery({
    queryKey: [
      "moreProduct",
      product?.ChildrenSubCategoryId ||
        productData?.data?.Product?.ChildrenSubCategoryId,
    ],
    queryFn: () =>
      fetchProductMore(
        product?.ChildrenSubCategoryId ||
          productData?.data?.Product?.ChildrenSubCategoryId
      ),
    enabled: !!(state || productData),
  });

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
            <BreadcrumbItem
              key={product?.title || productData?.data?.Product?.title}
              isCurrent
            >
              {product?.title || productData?.data?.Product?.title}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="mt-4 p-8 bg-gray-100 rounded-xl flex justify-between gap-8">
          <div className="w-full">
            <ImageProduct
              images={product?.Images || productData?.data?.Product?.Images}
            />
          </div>
          <div className="w-full">
            <h1 className="text-xl font-bold">
              {product?.title || productData?.data?.Product?.title}
            </h1>

            <div className="flex justify-between mt-3">
              <p>Terjual 0</p>
              {"|"}
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />0 (0 rating)
              </div>
              {"|"}
              <p>Diskusi ({data?.pagination?.count || 0})</p>
            </div>

            <div className="mt-5">
              {product?.discount < 1 ||
              productData?.data?.Product?.discount < 1 ? (
                <h1 className="text-3xl font-bold">
                  {formatRupiah(
                    product?.price || productData?.data?.Product?.price
                  )}
                </h1>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">
                    {formatRupiah(
                      product?.price - product?.discount ||
                        productData?.data?.Product?.price -
                          productData?.data?.Product?.discount
                    )}
                  </h1>
                  <div className="flex items-center gap-x-2 mt-1">
                    <Chip color="warning" size="sm" radius="sm">
                      {Math.round(
                        ((product?.price ||
                          productData?.data?.Product?.price -
                            (product?.price ||
                              productData?.data?.Product?.price -
                                product?.discount ||
                              productData?.data?.Product?.discount)) /
                          product?.price || productData?.data?.Product?.price) *
                          100
                      ) + "%"}
                    </Chip>
                    <span className="line-through text-gray-500">
                      {formatRupiah(
                        product?.price || productData?.data?.Product?.price
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
            <Divider className="my-4" />
            <div className="mt-5 text-sm flex gap-2 flex-col capitalize">
              <p>
                Kategori:{" "}
                {product?.ChildrenSubCategory?.title ||
                  productData?.data?.Product?.ChildrenSubCategory?.title}
              </p>
              <p>
                Kondisi:{" "}
                {product?.condition || productData?.data?.Product?.condition}
              </p>
              <p>
                Merek: {product?.brand || productData?.data?.Product?.brand}
              </p>
              <p>
                Berat: {product?.weight || productData?.data?.Product?.weight}{" "}
                Gram
              </p>
            </div>
            <div className="mt-8 mb-8">
              <h1 className="text-lg font-bold">Deskripsi</h1>

              <p className="mt-2 whitespace-pre-wrap break-all">
                {isDescription
                  ? product?.description ||
                    productData?.data?.Product?.description
                  : description}
              </p>

              {(product?.description.length >= 200 ||
                productData?.data?.Product?.description.length >= 200) && (
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
              <CardSeller
                product={product || productData?.data?.Product}
                isLogin={isLogin}
                setIsNote={setIsNote}
                isNote={isNote}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ReviewDiscussionPage
            product={productData ? productData?.data?.Product : product}
          />
        </div>
        <div className="mt-5">
          <RecommendProduct moreProduct={moreProduct} />
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

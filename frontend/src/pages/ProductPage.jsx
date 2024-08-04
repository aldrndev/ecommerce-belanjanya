import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/browse/Sidebar";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import Footer from "../components/Footer";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProductWithFilter } from "../../api/public";
import { useQuery } from "@tanstack/react-query";
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { formatRupiah } from "../../utils/formatCurrency";
import { FaStar } from "react-icons/fa";
import { Empty } from "antd";

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState(null);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const updateSearchParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set(key, value);
      newSearchParams.forEach((value, key) => {
        if (key === "category") {
          newSearchParams.delete("newCategory");
        }
      });
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  const sortHandler = (e) => {
    updateSearchParams("sort", e.target.value);
  };

  const pageHandler = (value) => {
    updateSearchParams("page", value);
    setCurrentPagination(value);
  };

  const category = categoryId;
  const name = searchParams.get("name");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const location = searchParams.get("location");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const newCategory = searchParams.get("newCategory");

  const navigate = useNavigate();
  const handlerPress = (value) => {
    if (value === "home") navigate("/");
  };

  const { data, isPending } = useQuery({
    queryKey: [
      "products",
      name,
      category,
      priceMin,
      priceMax,
      location,
      sort,
      newCategory,
      page,
    ],
    queryFn: () =>
      fetchProductWithFilter(
        name,
        category,
        priceMin,
        priceMax,
        location,
        sort,
        newCategory,
        page
      ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPagination]);

  useEffect(() => {
    const totalPages = data?.pagination?.totalPage;
    setTotalPage(totalPages);
  }, [data?.pagination]);

  useEffect(() => {
    setCurrentPage("product");
  }, []);

  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="flex gap-5 mt-48">
          <div className="bg-white shadow-lg flex w-[300px] h-full sticky top-48">
            <Sidebar
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              setCategoryId={setCategoryId}
              updateSearchParams={updateSearchParams}
            />
          </div>
          <div className="flex-1 flex-grow">
            <div className="flex justify-between">
              <div className="flex justify-start items-center">
                <Breadcrumbs
                  underline="active"
                  onAction={(key) => setCurrentPage(key)}
                >
                  <BreadcrumbItem
                    key="home"
                    isCurrent={currentPage === "home"}
                    onPress={() => handlerPress("home")}
                  >
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    key="product"
                    isCurrent={currentPage === "product"}
                    onPress={() => handlerPress("product")}
                  >
                    Produk
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
              <div className="flex justify-end w-[200px]">
                <Select label="Urutkan" size="sm" onChange={sortHandler}>
                  <SelectItem key={"termurah"}>Termurah</SelectItem>
                  <SelectItem key={"termahal"}>Termahal</SelectItem>
                </Select>
              </div>
            </div>
            {!data?.data ? (
              <div className="flex justify-center items-center">
                <div className="p-24">
                  <Empty />
                  <p className="mt-2">Tidak ada produk yang di temukan</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5 mt-5">
                {data?.data?.map((item, index) => {
                  return <ProductCard key={index} product={item} />;
                })}
              </div>
            )}
            <div className="mt-12 flex justify-center items-center">
              {!data?.data ? null : (
                <Pagination
                  isCompact
                  showControls
                  total={totalPage}
                  color="danger"
                  initialPage={1}
                  page={currentPagination}
                  onChange={pageHandler}
                />
              )}
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

const ProductCard = ({ product }) => {
  return (
    <Card shadow="sm">
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
              src={`http://localhost:3000/${product?.Images.at(0).image}`}
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

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
import Footer from "../components/Footer";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProductWithFilter } from "../../api/public";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { formatRupiah } from "../../utils/formatCurrency";
import { FaStar } from "react-icons/fa";
import { Empty, Pagination } from "antd";
import { addWishlist, fetchWishlist, removeWishlist } from "../../api/user";
import toast from "react-hot-toast";
import AuthPage from "../components/AuthPage";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState(null);
  const [totalPage, setTotalPage] = useState(1);

  const isLogin = localStorage.getItem("isLogin") === "true";
  const updateSearchParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    if (key === "category") {
      newSearchParams.delete("newCategory");
    }
    if (key !== "page") {
      newSearchParams.set("page", 1);
    }
    setSearchParams(newSearchParams);
  };

  const handleBlur = (key, value) => {
    updateSearchParams(key, value);
  };

  const handleEnter = (e, key, value) => {
    if (e.key === "Enter") {
      updateSearchParams(key, value);
    }
  };

  const handleKeyDownPrice = (e, key, value) => {
    if (["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    } else if (e.key === "Enter") {
      updateSearchParams(key, value);
    }
  };

  const sortHandler = (e) => {
    updateSearchParams("sort", e.target.value);
  };

  const page = searchParams.get("page");
  const category = categoryId;
  const name = searchParams.get("name");
  const categoryParams = searchParams.get("category");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const location = searchParams.get("location");
  const sort = searchParams.get("sort");
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
    const totalPages = data?.pagination?.totalPage;
    if (totalPages) {
      setTotalPage(totalPages);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, name, categoryParams, priceMin, priceMax, location]);

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
              name={name}
              categoryParams={categoryParams}
              priceMin={priceMin}
              priceMax={priceMax}
              location={location}
              handleBlur={handleBlur}
              handleEnter={handleEnter}
              handleKeyDownPrice={handleKeyDownPrice}
            />
          </div>
          <div className="flex-1 flex-grow">
            <div className="flex justify-between">
              <div className="flex justify-start items-center">
                <Breadcrumbs underline="active">
                  <BreadcrumbItem
                    key="home"
                    onPress={() => handlerPress("home")}
                  >
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    key="product"
                    isCurrent
                    onPress={() => handlerPress("product")}
                  >
                    Produk
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
              <div className="flex justify-end w-[200px]">
                <Select
                  label="Urutkan"
                  size="sm"
                  onChange={sortHandler}
                  selectedKeys={[sort]}
                >
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
                  return (
                    <ProductCard key={index} product={item} isLogin={isLogin} />
                  );
                })}
              </div>
            )}
            <div className="mt-12 flex justify-center items-center">
              {data?.data && (
                <Pagination
                  current={Number(page)}
                  onChange={(page) => updateSearchParams("page", page)}
                  total={totalPage * 10}
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

const ProductCard = ({ product, isLogin }) => {
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
    <Card shadow="sm">
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
              src={`http://localhost:3000/${product?.Images?.at(0)?.image}`}
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
                  {product?.title.length >= 45
                    ? product?.title.slice(0, 45) + "..."
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
          {product?.discount > 0 ? (
            <div>
              <p className=" font-semibold">
                {formatRupiah(product?.price - product?.discount)}
              </p>
              <div className="flex gap-x-1 items-center">
                <p className="text-gray-600 line-through text-xs">
                  {formatRupiah(product?.price)}
                </p>
                <p className="text-danger text-sm">
                  {Math.round(
                    ((product?.price - (product?.price - product?.discount)) /
                      product?.price) *
                      100
                  ) + "%"}
                </p>
              </div>
            </div>
          ) : (
            <p className="font-semibold">{formatRupiah(product?.price)}</p>
          )}
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <EnvironmentOutlined />
            <p className="capitalize">{product?.location?.toLowerCase()}</p>
          </div>
          <div className="flex justify-between items-center text-gray-500 text-sm">
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

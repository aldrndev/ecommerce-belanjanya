import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { fetchAllProducts } from "../../api/public";
import { Link } from "react-router-dom";
import { addWishlist, fetchWishlist, removeWishlist } from "../../api/user";
import toast from "react-hot-toast";
import { Empty } from "antd";

const LatestProduct = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "linear" });
  }, []);

  const isLogin = localStorage.getItem("isLogin") === "true";

  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending: pendingMutateAddWishlist } = useMutation({
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
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">Produk terbaru</h1>
      </div>
      {isPending && <Spinner label="Loading..." color="primary" />}
      {data?.length === 0 ? (
        <div className="flex justify-center items-center flex-col gap-y-2 p-10">
          <Empty />
          <p>Tidak ada produk yang di temukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {data?.map((item, index) => {
            return (
              <div data-aos="zoom-in" key={index}>
                <ProductCard
                  product={item}
                  handleWishlist={handleWishlist}
                  handleRemoveWishlist={handleRemoveWishlist}
                  wishlistData={wishlistData}
                  isLogin={isLogin}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-center items-center mt-8">
        <Link to={"/product"}>
          <Button
            variant="bordered"
            color="danger"
            size="lg"
            className="hover:bg-red-50"
          >
            Jelajahi Produk Lainnya
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestProduct;

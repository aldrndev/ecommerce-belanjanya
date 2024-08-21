import React from "react";
import ProductCard from "../ProductCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addWishlist, fetchWishlist, removeWishlist } from "../../../api/user";
import toast from "react-hot-toast";

const RecommendProduct = ({ moreProduct }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";

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
        <h1 className="text-2xl font-semibold">Produk lainnya untukmu</h1>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {moreProduct?.map((item, index) => (
          <ProductCard
            key={index}
            product={item}
            wishlistData={wishlistData}
            handleRemoveWishlist={handleRemoveWishlist}
            handleWishlist={handleWishlist}
            isLogin={isLogin}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendProduct;

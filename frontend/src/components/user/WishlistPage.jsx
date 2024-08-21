import ProductCard from "../ProductCard";
import CardLayout from "./CardLayout";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addWishlist,
  fetchWishlistWithPagination,
  removeWishlist,
} from "../../../api/user";

import toast from "react-hot-toast";
import { Empty, Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const queryClient = useQueryClient();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPage, setTotalPage] = useState(1);

  const page = searchParams.get("page");

  const { data, isPending } = useQuery({
    queryKey: ["wishlist", page],
    queryFn: () => fetchWishlistWithPagination(page),
    enabled: isLogin,
  });

  const { mutate: addingWishlist, isPending: pendingAddWishlist } = useMutation(
    {
      mutationFn: addWishlist,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const { mutate: removingWishlist, isPending: pendingRemoveWishlist } =
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

  const handleAddWishlist = (id) => {
    addingWishlist(id);
  };

  const handleRemoveWishlist = (id) => {
    removingWishlist(id);
  };

  useEffect(() => {
    if (!page) setSearchParams({ page: 1 });

    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (data?.pagination) {
      setTotalPage(data?.pagination?.totalPage);
    }
  }, [data?.pagination]);

  return (
    <div>
      <CardLayout>
        {data?.data.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-5">
              {data?.data?.map((item, index) => {
                return (
                  <div key={index}>
                    <ProductCard
                      product={item.Product}
                      isLogin={isLogin}
                      handleRemoveWishlist={handleRemoveWishlist}
                      handleWishlist={handleAddWishlist}
                      wishlistData={data?.data}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center items-center">
              {data?.data && (
                <Pagination
                  current={Number(page)}
                  onChange={(page) => setSearchParams({ page })}
                  total={totalPage * 10}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col gap-y-2">
            <Empty />
            <p>Belum ada wishlist</p>
          </div>
        )}
      </CardLayout>
    </div>
  );
};

export default WishlistPage;

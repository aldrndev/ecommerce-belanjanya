import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { fetchAllProducts } from "../../api/public";
import { Link } from "react-router-dom";

const LatestProduct = () => {
  useEffect(() => {
    AOS.init({ duration: 500, easing: "linear" });
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">Produk terbaru</h1>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {isPending && <Spinner label="Loading..." color="primary" />}
        {data?.map((item, index) => {
          return (
            <div data-aos="zoom-in" key={index}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
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

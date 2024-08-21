import React from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { formatRupiah } from "../../../../utils/formatCurrency";

const OrderPage = () => {
  const { state } = useLocation();
  const { data } = state || {};

  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="mt-40">
          {!data ? (
            <div>
              <h1 className="text-2xl flex justify-center items-center font-semibold">
                Belum ada pesanan yang berhasil
              </h1>
            </div>
          ) : (
            <Card className="w-[720px] mx-auto">
              <CardHeader>
                <div className="flex justify-center items-center mx-auto">
                  <h1 className="text-lg font-semibold">Pesanan Berhasil</h1>
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  <h2>Berikut adalah produk pesanan kamu :</h2>
                </div>
                {data?.data?.map((item, index) => (
                  <div
                    className="shadow-small p-5 rounded-2xl mt-3"
                    key={index}
                  >
                    <p className="  text-gray-400">PESANAN {index + 1}</p>
                    <div className="flex gap-x-2 items-center ml-1 mt-2">
                      <MdVerified className="text-danger" size={20} />
                      <p className="font-semibold capitalize">
                        {item.sellerName}
                      </p>
                    </div>
                    {item.carts.map((product) => (
                      <div
                        className="flex justify-between mt-4 items-center"
                        key={product.id}
                      >
                        <div className="flex gap-x-2 items-center">
                          <div className="w-20 h-20 flex justify-center items-center">
                            <Image
                              src={`http://localhost:3000/${product?.Cart?.Product?.Images[0]?.image}`}
                              width={80}
                              height={80}
                              alt={product.Cart.Product.title}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1 flex-1">
                            <p>{product.Cart.Product.title}</p>
                            <p className="text-gray-400 text-sm">
                              Catatan:{" "}
                              {product.Cart.note || "Tidak ada catatan"}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/2 flex justify-end">
                          <p className="font-semibold">
                            {product.Cart.quantity} x{" "}
                            {formatRupiah(
                              product.Cart.Product.discount
                                ? product.Cart.Product.price -
                                    product.Cart.Product.discount
                                : product.Cart.Product.price
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default OrderPage;

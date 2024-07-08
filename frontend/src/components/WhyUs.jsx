import { Image } from "@nextui-org/react";
import React from "react";

const WhyUs = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Mulai Belanja</h1>
      </div>
      <div className="flex justify-between gap-3 mt-16">
        <Option title="Jaminan Pembelian" img="1">
          Jaminan pembelian yang aman dan barang dijamin diterima.
        </Option>
        <Option title="Kemudahan Pembayaran" img="2">
          Pilihan pembayaran yang mudah, lengkap dan terpercaya.
        </Option>
        <Option title="Produk Lengkap" img="3">
          Produk lengkap dengan berbagai macam pilihan yang bisa dibeli.
        </Option>
        <Option title="Delivery Mudah" img="4">
          Banyak pilihan pengiriman seluruh indonesia, tanpa khawatir.
        </Option>
        <Option title="Promo dan Diskon" img="5">
          Promo dan diskon menarik setiap harinya yang bisa dipakai.
        </Option>
        <Option title="Pengembalian Barang" img="6">
          Jika barang yang diterima tidak sesuai maka dana akan dikembalikan.
        </Option>
      </div>
    </div>
  );
};

export default WhyUs;

const Option = ({ title, children, img }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-center items-center">
        <Image src={`/img/${img}.png`} width="70%" />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-base font-semibold">{title}</p>
      </div>
      <div className="text-center">
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
};

import { Divider } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div>
      <Divider className="my-4 mb-10" />
      <div className="flex justify-between gap-x-10">
        <div className="w-full">
          <div className="mb-2">
            <Logo />
          </div>
          <p>
            Belanjanya adalah situ jual beli barang yang sudah tidak terpakai
            agar menghasilkan uang. Mulai jual semua barang kamu yang sudah
            tidak terpakai sekarang juga
          </p>
        </div>
        <div className="w-1/3">
          <Option title="Jual Barang">
            <Link to="/product/elektronik-komputer">Elektronik & Komputer</Link>
            <Link to="/product/pakaian-pria">Pakaian Pria</Link>
            <Link to="/product/pakaian-wanita">Pakaian Wanita</Link>
            <Link to="/product/peralatan-rumah-tangga">
              Peralatan Rumah Tangga
            </Link>
            <Link to="/product/peralatan-olahraga">Peralatan Olahraga</Link>
            <Link to="/product/otomotif">Otomotif</Link>
            <Link to="/product/hobi">Hobi & Koleksi</Link>
            <Link to="/product/aksesoris">Aksesoris</Link>
          </Option>
        </div>
        <div className="w-1/3">
          <Option title="Beli Barang">
            <Link to="/product/elektronik-komputer">Elektronik & Komputer</Link>
            <Link to="/product/pakaian-pria">Pakaian Pria</Link>
            <Link to="/product/pakaian-wanita">Pakaian Wanita</Link>
            <Link to="/product/peralatan-rumah-tangga">
              Peralatan Rumah Tangga
            </Link>
            <Link to="/product/peralatan-olahraga">Peralatan Olahraga</Link>
            <Link to="/product/otomotif">Otomotif</Link>
            <Link to="/product/hobi">Hobi & Koleksi</Link>
            <Link to="/product/aksesoris">Aksesoris</Link>
          </Option>
        </div>
        <div className="w-1/3">
          <Option title="Perusahaan">
            <Link to="/about-us">Tentang Kami</Link>
            <Link to="/contact-us">Kontak Kami</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-condition">Terms & Condition</Link>
            <Link to="/return-policy">Return Policy</Link>
          </Option>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 text-sm p-5">
        <p>© {new Date().getFullYear()} Belanjanya.com</p>
      </div>
    </div>
  );
};

export default Footer;

const Option = ({ title, children }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">{title}</h1>
      <div className="flex flex-col gap-y-1">{children}</div>
    </div>
  );
};

import React, { useEffect } from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Link to="/">
          <Logo />
        </Link>
        <h1 className="font-bold text-xl mb-2 mt-5">Tentang Kami</h1>
        <p>
          Selamat datang di Belanjanya.com – platform e-commerce inovatif yang
          menghubungkan Anda dengan berbagai penjual dan produk dari seluruh
          dunia! Kami adalah penyedia tempat yang memungkinkan penjual pihak
          ketiga untuk memasarkan produk mereka dengan mudah dan efektif.
        </p>
        <h2 className="font-bold text-xl mb-2 mt-5">Misi Kami</h2>
        <p>
          Di Belanjanya, misi kami adalah memberikan platform yang efisien dan
          terpercaya untuk penjual dan pembeli. Kami percaya bahwa dengan
          menyediakan ruang bagi penjual untuk menjual produk mereka, kami dapat
          menawarkan kepada Anda berbagai pilihan produk yang beragam dan
          berkualitas. Kami berkomitmen untuk memastikan bahwa setiap transaksi
          di platform kami berjalan lancar dan memuaskan.
        </p>
        <h2 className="font-bold text-xl mb-2 mt-5">Apa yang Kami Tawarkan</h2>
        <ul>
          <li className="mb-2">
            <strong>1. Beragam Produk dari Penjual Terpercaya:</strong> Temukan
            berbagai produk menarik dari penjual pihak ketiga yang telah kami
            seleksi. Kami menawarkan berbagai kategori produk, mulai dari
            fashion hingga elektronik, untuk memenuhi semua kebutuhan Anda.
          </li>
          <li className="mb-2">
            <strong>2. Platform yang Mudah Digunakan:</strong> Dengan antarmuka
            pengguna yang ramah dan sistem pembayaran yang aman, kami memastikan
            bahwa belanja Anda di Belanjanya.com adalah pengalaman yang mudah
            dan nyaman.
          </li>
          <li className="mb-2">
            <strong>3. Dukungan Pelanggan yang Responsif:</strong> Kami berfokus
            pada kepuasan pelanggan dan menyediakan tim dukungan yang siap
            membantu Anda dengan pertanyaan atau masalah yang mungkin Anda
            hadapi selama berbelanja.
          </li>
        </ul>
        <h2 className="font-bold text-xl mb-2 mt-5">Tim Kami</h2>
        <p>
          Belanjanya.com didirikan oleh sekelompok profesional yang berdedikasi
          untuk mengubah cara Anda berbelanja online. Kami bekerja keras untuk
          memastikan bahwa platform kami memenuhi standar tertinggi dalam hal
          kualitas, keamanan, dan kepuasan pelanggan.
        </p>
        <h2 className="font-bold text-xl mb-2 mt-5">Hubungi Kami</h2>
        <p>
          Kami sangat menghargai masukan dari Anda. Jika Anda memiliki
          pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi tim
          dukungan kami melalui{" "}
          <span className="font-semibold text-danger">
            contact@belanjanya.com
          </span>{" "}
          atau <span className="font-semibold text-danger">+6285175410901</span>{" "}
          Kami siap membantu Anda setiap saat.
        </p>
        <p className="mt-5">
          Terima kasih telah memilih Belanjanya.com sebagai platform belanja
          Anda. Nikmati pengalaman berbelanja yang berbeda dan bermanfaat dengan
          kami!
        </p>
      </div>
    </>
  );
};

export default AboutUs;

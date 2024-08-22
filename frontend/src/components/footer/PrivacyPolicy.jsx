import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="font-bold text-xl mt-5 mb-5">Kebijakan Privasi</h1>

      <p>
        Selamat datang di Belanjanya.com. Kami menghargai privasi Anda dan
        berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan Privasi
        ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
        informasi Anda ketika Anda menggunakan situs web kami.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        Informasi yang Kami Kumpulkan
      </h2>
      <p>
        Kami mengumpulkan berbagai jenis informasi untuk menyediakan dan
        meningkatkan layanan kami kepada Anda, termasuk:
      </p>
      <ul className="mt-3 mb-2">
        <li>
          <strong>Informasi Pribadi:</strong> Nama, alamat email, nomor telepon,
          dan informasi lain yang Anda berikan saat mendaftar atau membuat
          pembelian.
        </li>
        <li>
          <strong>Informasi Transaksi:</strong> Detail tentang pembelian dan
          penjualan yang Anda lakukan melalui situs kami.
        </li>
        <li>
          <strong>Informasi Teknologi:</strong> Alamat IP, jenis browser, dan
          data lain yang dikumpulkan melalui cookies dan teknologi pelacakan
          lainnya.
        </li>
      </ul>

      <h2 className="font-bold text-xl mt-5 mb-2">
        Bagaimana Kami Menggunakan Informasi Anda
      </h2>
      <p>
        Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan,
        termasuk:
      </p>
      <ul className="mt-3 mb-2">
        <li>1. Memproses dan mengelola pesanan Anda.</li>
        <li>2. Menyediakan layanan pelanggan dan dukungan.</li>
        <li>3. Mengirimkan informasi tentang produk dan layanan kami.</li>
        <li>4. Meningkatkan pengalaman pengguna dan situs web kami.</li>
      </ul>

      <h2 className="font-bold text-xl mt-5 mb-2">
        Bagaimana Kami Melindungi Informasi Anda
      </h2>
      <p>
        Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi
        informasi pribadi Anda dari akses yang tidak sah, perubahan,
        pengungkapan, atau penghancuran. Kami menggunakan enkripsi dan teknologi
        keamanan terbaru untuk menjaga data Anda tetap aman.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">Berbagi Informasi Anda</h2>
      <p>
        Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak
        ketiga. Namun, kami dapat membagikan informasi Anda dengan pihak ketiga
        terpercaya yang membantu kami dalam operasional situs web, seperti
        penyedia layanan pembayaran dan pengiriman.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">Hak Anda</h2>
      <p>
        Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi
        pribadi Anda. Jika Anda ingin mengakses atau mengubah informasi Anda,
        atau jika Anda memiliki pertanyaan tentang kebijakan privasi kami,
        silakan hubungi kami melalui <strong>Email</strong> atau{" "}
        <strong>Telepon</strong>.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        Perubahan Kebijakan Privasi
      </h2>
      <p>
        Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami
        akan memberi tahu Anda tentang perubahan tersebut dengan memposting
        kebijakan privasi yang baru di situs kami. Anda disarankan untuk
        meninjau kebijakan privasi ini secara berkala untuk mengetahui perubahan
        terbaru.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">Hubungi Kami</h2>
      <p>
        Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan
        privasi kami, silakan hubungi kami di:
      </p>
      <ul className="mt-3 mb-2">
        <li>
          <strong>Email:</strong>{" "}
          <Link to="mailto:contact@belanjanya.com">contact@belanjanya.com</Link>
        </li>
        <li>
          <strong>Telepon:</strong>{" "}
          <Link to="tel:+6285175410901">+6285175410901</Link>
        </li>
        <li>
          <strong>Alamat:</strong> Jl. Villa Jatirasa No. 68, Jatiasih, Bekasi
          17423
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;

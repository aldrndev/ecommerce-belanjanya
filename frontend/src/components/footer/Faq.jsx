import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="font-bold text-xl mt-5 mb-5">
        Frequently Asked Questions (FAQ)
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>
          Pertanyaan 1: Bagaimana cara mendaftar sebagai penjual di
          Belanjanya.com?
        </h2>
        <p>
          Untuk mendaftar sebagai penjual, Anda dapat mengunjungi halaman{" "}
          <strong>Daftar</strong> di Menu Seller dan mengisi formulir
          pendaftaran.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>
          Pertanyaan 2: Apa yang harus saya lakukan jika saya lupa kata sandi
          akun saya?
        </h2>
        <p>
          Jika Anda lupa kata sandi, Anda dapat mengklik{" "}
          <strong>Lupa Kata Sandi</strong> di halaman masuk. Ikuti petunjuk
          untuk mereset kata sandi Anda melalui email yang terdaftar.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Pertanyaan 3: Bagaimana cara melacak pesanan saya?</h2>
        <p>
          Setelah Anda melakukan pembelian, Anda akan menerima email konfirmasi
          dengan nomor pelacakan. Anda dapat menggunakan nomor pelacakan
          tersebut untuk memantau status pengiriman pesanan Anda di halaman{" "}
          <strong>Pelacakan Pesanan</strong>.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>
          Pertanyaan 4: Apakah saya bisa mengembalikan barang yang sudah dibeli?
        </h2>
        <p>
          Ya, kami menawarkan kebijakan pengembalian barang. Untuk informasi
          lebih lanjut tentang proses pengembalian, silakan kunjungi halaman{" "}
          <strong>Pengembalian dan Penukaran</strong> atau hubungi tim dukungan
          kami.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Pertanyaan 5: Apakah ada biaya pengiriman?</h2>
        <p>
          Biaya pengiriman tergantung pada lokasi dan berat pesanan Anda. Anda
          akan melihat estimasi biaya pengiriman sebelum menyelesaikan
          pembayaran. Kami juga menawarkan opsi pengiriman gratis untuk pesanan
          tertentu.
        </p>
      </div>
    </div>
  );
};

export default Faq;

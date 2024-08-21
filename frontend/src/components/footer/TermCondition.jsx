import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const TermCondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="text-xl font-bold mt-5 mb-2">Syarat dan Ketentuan</h1>
      <p>
        Selamat datang di Belanjanya.com. Dengan mengakses dan menggunakan situs
        web kami, Anda setuju untuk mematuhi syarat dan ketentuan berikut. Harap
        baca dengan cermat sebelum menggunakan layanan kami.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">1. Akun Pengguna</h2>
      <p>
        Untuk menggunakan beberapa fitur di Belanjanya.com, Anda mungkin perlu
        mendaftar dan membuat akun. Anda bertanggung jawab untuk menjaga
        kerahasiaan informasi akun Anda dan bertanggung jawab penuh atas semua
        aktivitas yang terjadi di akun Anda.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">2. Penggunaan Layanan</h2>
      <p>
        Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah
        dan sesuai dengan hukum yang berlaku. Anda tidak diperbolehkan untuk
        menggunakan situs web kami untuk kegiatan ilegal, merugikan, atau yang
        dapat melanggar hak orang lain.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">3. Produk dan Penjual</h2>
      <p>
        Belanjanya.com berfungsi sebagai platform untuk menghubungkan penjual
        dan pembeli. Kami tidak bertanggung jawab atas kualitas, keamanan, atau
        legalitas produk yang dijual oleh penjual pihak ketiga. Semua transaksi
        dilakukan langsung antara pembeli dan penjual.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        4. Pembayaran dan Pengembalian
      </h2>
      <p>
        Pembayaran untuk produk yang dibeli di Belanjanya.com harus dilakukan
        melalui metode pembayaran yang tersedia di situs kami. Kebijakan
        pengembalian dan penukaran produk diatur oleh penjual masing-masing.
        Harap tinjau kebijakan pengembalian yang ditetapkan oleh penjual sebelum
        melakukan pembelian.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        5. Hak Kekayaan Intelektual
      </h2>
      <p>
        Semua konten, termasuk teks, gambar, dan logo di Belanjanya.com adalah
        hak milik kami atau pihak ketiga dan dilindungi oleh hak cipta dan
        undang-undang kekayaan intelektual lainnya. Anda tidak diperbolehkan
        untuk menyalin, mendistribusikan, atau menggunakan konten tersebut tanpa
        izin tertulis dari kami.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        6. Pembatasan Tanggung Jawab
      </h2>
      <p>
        Belanjanya.com tidak bertanggung jawab atas kerugian atau kerusakan yang
        timbul akibat penggunaan situs web kami, termasuk namun tidak terbatas
        pada kesalahan, gangguan, atau virus. Kami tidak menjamin bahwa situs
        web kami akan selalu tersedia atau bebas dari kesalahan.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        7. Perubahan Syarat dan Ketentuan
      </h2>
      <p>
        Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke waktu.
        Kami akan memberi tahu Anda tentang perubahan tersebut dengan memposting
        syarat dan ketentuan yang baru di situs kami. Anda disarankan untuk
        meninjau syarat dan ketentuan ini secara berkala.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">8. Hukum yang Berlaku</h2>
      <p>
        Syarat dan ketentuan ini diatur oleh hukum yang berlaku di Negara
        Indonesia. Setiap perselisihan yang timbul dari penggunaan situs web
        kami akan diselesaikan di pengadilan yang berwenang.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">9. Kontak Kami</h2>
      <p>
        Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan
        hubungi kami di:
      </p>
      <ul className="mt-3">
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

export default TermCondition;

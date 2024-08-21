import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="text-xl font-bold mt-5 mb-2">Kebijakan Pengembalian</h1>

      <p>
        Di Belanjanya.com, kami berkomitmen untuk memastikan bahwa Anda puas
        dengan pembelian Anda. Jika Anda perlu mengembalikan barang, harap baca
        kebijakan pengembalian kami berikut untuk informasi lengkap tentang
        proses dan persyaratannya.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        1. Masa Berlaku Pengembalian
      </h2>
      <p>
        Anda dapat mengembalikan barang dalam waktu 30 hari sejak tanggal
        penerimaan pesanan Anda. Setelah periode 30 hari, kami tidak dapat
        menerima pengembalian atau menawarkan pengembalian dana.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        2. Syarat dan Ketentuan Pengembalian
      </h2>
      <p>Barang yang ingin Anda kembalikan harus memenuhi syarat berikut:</p>
      <ul className="mt-2">
        <li>
          1. Barang belum digunakan, tidak rusak, dan dalam kondisi asli
          (termasuk kemasan, tag, dan label).
        </li>
        <li>2. Barang harus dikembalikan dengan bukti pembelian atau nota.</li>
        <li>
          3. Barang yang termasuk dalam kategori tidak dapat dikembalikan,
          seperti produk khusus, barang dengan tanggal kedaluwarsa, atau barang
          yang sudah dibuka dari kemasannya.
        </li>
      </ul>

      <h2 className="font-bold text-xl mt-5 mb-2">
        3. Cara Mengembalikan Barang
      </h2>
      <p>Untuk memulai proses pengembalian, ikuti langkah-langkah berikut:</p>
      <ul className="mt-2">
        <li>
          1. Kunjungi halaman <strong>Pengembalian Barang</strong> di situs kami
          dan isi formulir pengembalian.
        </li>
        <li>
          2. Kemasan barang yang ingin Anda kembalikan dengan aman, sertakan
          semua aksesori, tag, dan dokumen yang terkait.
        </li>
        <li>
          3. Kirimkan barang ke alamat pengembalian yang tertera pada formulir
          pengembalian atau email konfirmasi.
        </li>
      </ul>

      <h2 className="font-bold text-xl mt-5 mb-2">4. Pengembalian Dana</h2>
      <p>
        Setelah kami menerima dan memproses barang yang dikembalikan, kami akan
        memproses pengembalian dana ke metode pembayaran asli Anda. Pengembalian
        dana biasanya diproses dalam waktu 7-10 hari kerja setelah barang
        diterima.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">5. Biaya Pengembalian</h2>
      <p>
        Biaya pengembalian barang adalah tanggung jawab pelanggan, kecuali jika
        barang yang diterima salah atau rusak. Kami akan memberikan label
        pengembalian gratis dalam kasus tersebut.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">
        6. Barang Rusak atau Salah
      </h2>
      <p>
        Jika Anda menerima barang yang rusak atau salah, harap hubungi kami
        dalam waktu 7 hari setelah menerima pesanan untuk mendapatkan bantuan
        lebih lanjut. Kami akan membantu Anda dalam proses pengembalian dan
        penggantian barang tanpa biaya tambahan.
      </p>

      <h2 className="font-bold text-xl mt-5 mb-2">7. Pertanyaan dan Bantuan</h2>
      <p>
        Jika Anda memiliki pertanyaan mengenai kebijakan pengembalian ini atau
        memerlukan bantuan lebih lanjut, silakan hubungi kami di:
      </p>
      <ul className="mt-2">
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

export default ReturnPolicy;

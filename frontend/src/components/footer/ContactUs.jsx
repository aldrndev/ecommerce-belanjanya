import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="text-xl font-bold mb-2 mt-5">Hubungi Kami</h1>
      <p className="mb-2">
        Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran,
        atau membutuhkan bantuan, jangan ragu untuk menghubungi kami melalui
        salah satu cara berikut:
      </p>
      <ul className="mt-5">
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
      <p className="mt-5">
        Tim dukungan kami siap membantu Anda dengan pertanyaan atau masalah yang
        mungkin Anda hadapi. Kami berusaha memberikan pelayanan yang cepat dan
        responsif untuk memastikan kepuasan Anda.
      </p>
    </div>
  );
};

export default ContactUs;

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import HomeCategory from "../components/HomeCategory";
import LatestProduct from "../components/LatestProduct";
import ProductByLocation from "../components/ProductByLocation";
import Footer from "../components/Footer";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="mt-40 m">
          <Carousel />
        </div>
        <div className="flex justify-center items-center mt-10">
          <HomeCategory />
        </div>
        <div className="mt-10">
          <ProductByLocation />
        </div>
        <div className="mt-10">
          <LatestProduct />
        </div>
        <div className="mt-20">
          <WhyUs />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Home;

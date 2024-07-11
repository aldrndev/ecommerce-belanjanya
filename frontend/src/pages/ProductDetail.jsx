import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Divider,
  Image,
} from "@nextui-org/react";
import ImageProduct from "../components/browse/ImageProduct";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import CardSeller from "../components/browse/CardSeller";
import { CiLocationOn } from "react-icons/ci";
import ReviewDiscussionPage from "../components/browse/ReviewDiscussionPage";
import RecommendProduct from "../components/browse/RecommendProduct";
import { useState } from "react";

const ProductDetail = () => {
  const [currentPage, setCurrentPage] = useState("song");
  const list = [
    {
      title: "Orange",
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
      price: "$5.50",
      description: "lorem ipsum dolor sit amet",
      userId: {
        name: "Aldrin Mursidi",
        foto: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        handphone: "081234567890",
        alamat: "Bekasi",
      },
    },
  ];
  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="mt-44">
          <Breadcrumbs
            underline="active"
            onAction={(key) => setCurrentPage(key)}
          >
            <BreadcrumbItem key="home" isCurrent={currentPage === "home"}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
              Music
            </BreadcrumbItem>
            <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
              Artist
            </BreadcrumbItem>
            <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
              Album
            </BreadcrumbItem>
            <BreadcrumbItem key="song" isCurrent={currentPage === "song"}>
              Song
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="mt-4 p-8 bg-gray-100 rounded-xl flex justify-between gap-8">
          <div className="w-full">
            <ImageProduct />
          </div>
          <div className="w-full">
            <h1 className="text-xl font-bold">
              Premium Mix Nuts / Trail Mix/Kacang Mix /Almond Cashew Pistachio
              250g
            </h1>
            <div className="flex justify-between mt-3">
              <p>Terjual 450</p>
              {"|"}
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                4.9 (100 rating)
              </div>
              {"|"}
              <p>Diskusi (11)</p>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold">Rp120.099</h1>
            </div>
            <Divider className="my-4" />
            <div className="mt-5 text-sm flex gap-2 flex-col">
              <p>Kategori: Peralatan Olahraga</p>
              <p>Kondisi: Baru</p>
              <p>Merek: Asus</p>
            </div>
            <div className="mt-8 mb-8">
              <h1 className="text-lg font-bold">Deskripsi</h1>
              <p className="mt-2 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                doloremque recusandae voluptates reprehenderit a aperiam sed.
                Praesentium voluptatum dolore, nesciunt corrupti nemo corporis,
                repudiandae numquam beatae atque quia esse saepe! Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ratione nesciunt id
                incidunt placeat a saepe sint beatae ipsum nemo, labore nulla
                magnam magni quod, ad ipsa provident ut fuga deleniti? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Alias iure
                eos quisquam nobis consequatur reiciendis, ducimus delectus,
                tenetur architecto placeat, officia quas! Ut, sint non unde
                quidem vitae dolores. Sed. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Eligendi magnam ab architecto quae
                dolor id commodi laborum ullam eaque? Odio reprehenderit
                architecto asperiores voluptatibus ipsam eos ipsa unde modi
                minus. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Porro unde hic magnam, quos adipisci quas minima expedita animi
                ad dolorem eaque amet, possimus iusto necessitatibus. Illo
                recusandae quas atque minima? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Hic eveniet provident quis quas
                maiores recusandae vero harum fugit, repellendus soluta corporis
                magnam quaerat reiciendis voluptatem explicabo perspiciatis
                expedita culpa molestias!
              </p>
            </div>
          </div>
          <div className="w-3/5">
            <div className="sticky top-48">
              <CardSeller />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ReviewDiscussionPage />
        </div>
        <div className="mt-5">
          <RecommendProduct />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;

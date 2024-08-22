import { Image } from "@nextui-org/react";
import { Carousel as CarouselAnt } from "antd";

const CarouselPage = () => {
  return (
    <CarouselAnt arrows infinite={true} autoplay={true} draggable={true}>
      <div>
        <Image src="/1.jpg.webp" width={"100%"} />
      </div>
      <div>
        <Image src="/2.jpg.webp" width={"100%"} />
      </div>
      <div>
        <Image src="/3.jpg.webp" width={"100%"} />
      </div>
      <div>
        <Image src="/4.jpg.webp" width={"100%"} />
      </div>
    </CarouselAnt>
  );
};

export default CarouselPage;

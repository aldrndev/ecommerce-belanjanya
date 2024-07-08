import { Image } from "@nextui-org/react";
import { Carousel as CarouselAnt } from "antd";

const CarouselPage = () => {
  return (
    <CarouselAnt arrows infinite={true} autoplay={true} draggable={true}>
      <div>
        <Image
          src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/2/cd0a4cde-a6c0-4a1d-af38-2916a64d6148.jpg.webp?ect=4g"
          width={"100%"}
        />
      </div>
      <div>
        <Image
          src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/2/cd0a4cde-a6c0-4a1d-af38-2916a64d6148.jpg.webp?ect=4g"
          width={"100%"}
        />
      </div>
      <div>
        <Image
          src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/2/cd0a4cde-a6c0-4a1d-af38-2916a64d6148.jpg.webp?ect=4g"
          width={"100%"}
        />
      </div>
      <div>
        <Image
          src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/2/cd0a4cde-a6c0-4a1d-af38-2916a64d6148.jpg.webp?ect=4g"
          width={"100%"}
        />
      </div>
    </CarouselAnt>
  );
};

export default CarouselPage;

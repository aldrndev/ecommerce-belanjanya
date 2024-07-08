import { Image } from "antd";

const ImageProduct = () => {
  const image = [
    {
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
    },
    {
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
    },
    {
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
    },
    {
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
    },
    {
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
    },
    {
      img: "https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Image src={image[0].img} alt="image" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {image.slice(1).map((item, index) => (
          <Image key={index} src={item.img} alt="image" />
        ))}
      </div>
    </div>
  );
};

export default ImageProduct;

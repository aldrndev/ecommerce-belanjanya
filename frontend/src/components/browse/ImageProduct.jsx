import { Image } from "antd";

const ImageProduct = ({ images }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Image
          src={`http://localhost:3000/${images?.at(0)?.image}`}
          alt="image"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images?.slice(1)?.map((item, index) => (
          <Image
            key={index}
            src={`http://localhost:3000/${item?.image}`}
            alt="image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageProduct;

import { Button, Card, CardBody, Image, Input } from "@nextui-org/react";
import { Divider } from "antd";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiLocationOn, CiShare2 } from "react-icons/ci";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import CustomInputNumber from "../CustomInputNumber";

const CardSeller = () => {
  const [isNote, setIsNote] = useState("false");
  const handleNoteClick = () => {
    setIsNote(!isNote);
  };
  const [value, setValue] = useState(1);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Card shadow="sm">
      <CardBody>
        <div>
          <h1 className="font-semibold">Atur jumlah</h1>
          <div className="mt-3 flex justify-between gap-3">
            <CustomInputNumber
              width={"w-full"}
              value={value}
              onChange={handleInputChange}
              startContent={
                <button onClick={() => setValue(value - 1)}>-</button>
              }
              endContent={
                <button onClick={() => setValue(value + 1)}>+</button>
              }
            />
            <div className="w-full flex items-center">
              <p className="text-sm">Stock Total: 400</p>
            </div>
          </div>
          <div className="mt-4">
            <Link onClick={handleNoteClick} variant="light">
              <div className="flex items-center gap-2 text-danger text-sm">
                <GoPencil />
                {isNote ? "Tambahkan catatan" : "Hapus catatan"}
              </div>
            </Link>
            {!isNote && (
              <div className="mt-2">
                <Input placeholder="Contoh: warna putih" />
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-base">Subtotal</p>
            <p className="font-semibold">Rp41.000.000</p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button color="danger">+ Keranjang</Button>
            <Button color="danger" variant="bordered">
              Beli Langsung
            </Button>
          </div>
          <Divider className="my-8" />
          <div className="mt-4">
            <div className="flex gap-3 mt-3 items-center">
              <div className="w-[70px]">
                <Image
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  radius="full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm">Aldrin Mursidi</p>
                <div className="flex items-center gap-2 text-sm">
                  <FaStar className="text-yellow-400" />
                  4.9 (100 rating)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CiLocationOn />
                  Bekasi
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <IoChatboxEllipsesOutline />
              Chat
            </div>
            {"|"}
            <div className="flex items-center gap-2">
              <HeartOutlined />
              Wishlist
            </div>
            {"|"}
            <div className="flex items-center gap-2">
              <CiShare2 />
              Bagikan
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardSeller;

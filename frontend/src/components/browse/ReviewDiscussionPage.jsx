import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Pagination,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Rate } from "antd";
import { Textarea } from "@nextui-org/react";
import { MdOutlineRateReview } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ReviewDiscussionPage = () => {
  return (
    <div className="flex w-full justify-center items-center flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        size="lg"
        fullWidth
        className="w-1/2"
        variant="bordered"
      >
        <Tab
          key="ulasan"
          title={
            <div className="flex items-center space-x-2">
              <MdOutlineRateReview size={24} />
              <p>Ulasan</p>
            </div>
          }
        >
          <div className="w-[1280px]">
            <Card className="p-5">
              <CardBody>
                <ReviewPage />
              </CardBody>
            </Card>
          </div>
        </Tab>
        <Tab
          key="diskusi"
          title={
            <div className="flex items-center space-x-2">
              <GoCommentDiscussion size={24} />
              <span>Diskusi</span>
            </div>
          }
        >
          <div className="w-[1280px]">
            <Card className="p-5">
              <CardBody>
                <DiscussionPage />
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReviewDiscussionPage;

const TotalReview = () => {
  return (
    <Card className="w-1/2 h-full p-5" shadow="sm">
      <CardBody>
        <p>Ulasan Pembeli</p>
        <div className="flex gap-x-2 items-center mt-3">
          <FaStar size={28} className="text-yellow-400" />
          <p className="text-5xl">
            4.9<span className="text-lg text-gray-400">/5.0</span>
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <p className="text-sm">98% pembeli merasa puas</p>
          <div>
            <Tooltip
              content="Dihitung dari jumlah rating positif (bintang 4 dan 5) dibagi dengan total rating."
              placement="bottom"
            >
              <ExclamationCircleOutlined />
            </Tooltip>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400">5.482 rating • 1.054 ulasan</p>
        </div>
        <div className="flex gap-x-1 mt-3 items-center">
          <div>
            <FaStar className="text-yellow-400" />
          </div>
          <p>5</p>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="w-full">
            <Progress
              aria-label="Loading..."
              value={60}
              color="danger"
              size="sm"
            />
          </div>
          <div className="w-1/6">
            <p>50.407</p>
          </div>
        </div>
        <div className="flex gap-x-1 mt-3 items-center">
          <div>
            <FaStar className="text-yellow-400" />
          </div>
          <p>4</p>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="w-full">
            <Progress
              aria-label="Loading..."
              value={60}
              color="danger"
              size="sm"
            />
          </div>
          <div className="w-1/6">
            <p>523</p>
          </div>
        </div>
        <div className="flex gap-x-1 mt-3 items-center">
          <div>
            <FaStar className="text-yellow-400" />
          </div>
          <p>3</p>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="w-full">
            <Progress
              aria-label="Loading..."
              value={60}
              color="danger"
              size="sm"
            />
          </div>
          <div className="w-1/6">
            <p>522</p>
          </div>
        </div>
        <div className="flex gap-x-1 mt-3 items-center">
          <div>
            <FaStar className="text-yellow-400" />
          </div>
          <p>2</p>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="w-full">
            <Progress
              aria-label="Loading..."
              value={20}
              color="danger"
              size="sm"
            />
          </div>
          <div className="w-1/6">
            <p>1092</p>
          </div>
        </div>
        <div className="flex gap-x-1 mt-3 items-center">
          <div>
            <FaStar className="text-yellow-400" />
          </div>
          <p>1</p>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="w-full">
            <Progress
              aria-label="Loading..."
              value={5}
              color="danger"
              size="sm"
            />
          </div>
          <div className="w-1/6">
            <p>10</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
const ReviewPage = () => {
  return (
    <>
      <div className="flex justify-between gap-x-8">
        <TotalReview />
        <div>
          <div className="flex gap-3 items-center">
            <Rate />
            <p className="text-sm">3 hari lalu</p>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-[90px]">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                radius="full"
              />
            </div>
            <div className="flex flex-col">
              <p>Aldrin Mursidi</p>
              <p>
                Super enak ,bahan berkualitas tinggi , higienis,sehat udah
                bertahun tahun langganan di toko ini tidak pernah mengecewakan
                selalu terjaga kualitasnya,sangat rekomendasi toko ini
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 w-1/3 gap-1 mb-3">
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Rate />
            <p className="text-sm">3 hari lalu</p>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-[90px]">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                radius="full"
              />
            </div>
            <div className="flex flex-col">
              <p>Aldrin Mursidi</p>
              <p>
                Super enak ,bahan berkualitas tinggi , higienis,sehat udah
                bertahun tahun langganan di toko ini tidak pernah mengecewakan
                selalu terjaga kualitasnya,sangat rekomendasi toko ini
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 w-1/3 gap-1 mb-3">
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Rate />
            <p className="text-sm">3 hari lalu</p>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-[90px]">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                radius="full"
              />
            </div>
            <div className="flex flex-col">
              <p>Aldrin Mursidi</p>
              <p>
                Super enak ,bahan berkualitas tinggi , higienis,sehat udah
                bertahun tahun langganan di toko ini tidak pernah mengecewakan
                selalu terjaga kualitasnya,sangat rekomendasi toko ini
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 w-1/3 gap-1 mb-3">
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Rate />
            <p className="text-sm">3 hari lalu</p>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-[90px]">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                radius="full"
              />
            </div>
            <div className="flex flex-col">
              <p>Aldrin Mursidi</p>
              <p>
                Super enak ,bahan berkualitas tinggi , higienis,sehat udah
                bertahun tahun langganan di toko ini tidak pernah mengecewakan
                selalu terjaga kualitasnya,sangat rekomendasi toko ini
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 w-1/3 gap-1 mb-3">
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Rate />
            <p className="text-sm">3 hari lalu</p>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="w-[90px]">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                radius="full"
              />
            </div>
            <div className="flex flex-col">
              <p>Aldrin Mursidi</p>
              <p>
                Super enak ,bahan berkualitas tinggi , higienis,sehat udah
                bertahun tahun langganan di toko ini tidak pernah mengecewakan
                selalu terjaga kualitasnya,sangat rekomendasi toko ini
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 w-1/3 gap-1 mb-3">
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
            <Image
              src="https://dynamic.zacdn.com/gQRduJacFWUiEQ-zMOMBjLGIYGQ=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/new-balance-9996-5422514-1.jpg"
              width={50}
              height={50}
            />
          </div>
          <div className="mt-8 flex justify-center items-center">
            <Pagination
              isCompact
              showControls
              total={10}
              initialPage={1}
              color="danger"
            />
          </div>
        </div>
      </div>

      <Divider className="my-4" />
    </>
  );
};

const DiscussionPage = () => {
  const [isReply, setIsReply] = useState(false);
  return (
    <>
      <div className="bg-gray-100 p-3 rounded-2xl">
        <div>
          <Textarea
            label="Diskusi"
            placeholder="Tulis pertanyaan kamu disini"
            variant="bordered"
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button variant="bordered" color="danger">
            Kirim
          </Button>
        </div>
      </div>

      <Divider className="my-4" />
      <div className="flex gap-3 mt-3">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">3 hari lalu</p>
          <p>Aldrin Mursidi</p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste earum
          </p>
          <p
            className="text-danger cursor-pointer hover:text-red-700 mt-1"
            onClick={() => setIsReply(!isReply)}
          >
            {isReply ? "Tutup" : "Komentar"}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 mt-3 rounded-2xl">
        <div className="flex gap-3 ml-20 mt-3">
          <div className="w-[50px]">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              radius="full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">3 hari lalu</p>
            <p className="text-base">Aldrin Mursidi</p>
            <p>Lorem, ipsum dolor sit</p>
          </div>
        </div>

        {isReply && (
          <>
            <div className="flex gap-3 ml-20 items-center mt-1">
              <div>
                <Image
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  radius="full"
                  width={50}
                />
              </div>
              <div className="w-[1280px] mt-3">
                <Textarea
                  placeholder="Tulis balasan kamu disini"
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button color="danger" variant="bordered">
                Kirim
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">3 hari lalu</p>
          <p>Aldrin Mursidi</p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste earum
          </p>
          <p
            className="text-danger cursor-pointer hover:text-red-700 mt-1"
            onClick={() => setIsReply(!isReply)}
          >
            {isReply ? "Tutup" : "Komentar"}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 mt-3 rounded-2xl">
        <div className="flex gap-3 ml-20 mt-3">
          <div className="w-[50px]">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              radius="full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">3 hari lalu</p>
            <p className="text-base">Aldrin Mursidi</p>
            <p>Lorem, ipsum dolor sit</p>
          </div>
        </div>

        {isReply && (
          <>
            <div className="flex gap-3 ml-20 items-center mt-1">
              <div>
                <Image
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  radius="full"
                  width={50}
                />
              </div>
              <div className="w-[1280px] mt-3">
                <Textarea
                  placeholder="Tulis balasan kamu disini"
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button color="danger" variant="bordered">
                Kirim
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">3 hari lalu</p>
          <p>Aldrin Mursidi</p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste earum
          </p>
          <p
            className="text-danger cursor-pointer hover:text-red-700 mt-1"
            onClick={() => setIsReply(!isReply)}
          >
            {isReply ? "Tutup" : "Komentar"}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 mt-3 rounded-2xl">
        <div className="flex gap-3 ml-20 mt-3">
          <div className="w-[50px]">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              radius="full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">3 hari lalu</p>
            <p className="text-base">Aldrin Mursidi</p>
            <p>Lorem, ipsum dolor sit</p>
          </div>
        </div>

        {isReply && (
          <>
            <div className="flex gap-3 ml-20 items-center mt-1">
              <div>
                <Image
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  radius="full"
                  width={50}
                />
              </div>
              <div className="w-[1280px] mt-3">
                <Textarea
                  placeholder="Tulis balasan kamu disini"
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button color="danger" variant="bordered">
                Kirim
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">3 hari lalu</p>
          <p>Aldrin Mursidi</p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste earum
          </p>
          <p
            className="text-danger cursor-pointer hover:text-red-700 mt-1"
            onClick={() => setIsReply(!isReply)}
          >
            {isReply ? "Tutup" : "Komentar"}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 mt-3 rounded-2xl">
        <div className="flex gap-3 ml-20 mt-3">
          <div className="w-[50px]">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              radius="full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">3 hari lalu</p>
            <p className="text-base">Aldrin Mursidi</p>
            <p>Lorem, ipsum dolor sit</p>
          </div>
        </div>

        {isReply && (
          <>
            <div className="flex gap-3 ml-20 items-center mt-1">
              <div>
                <Image
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  radius="full"
                  width={50}
                />
              </div>
              <div className="w-[1280px] mt-3">
                <Textarea
                  placeholder="Tulis balasan kamu disini"
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button color="danger" variant="bordered">
                Kirim
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">3 hari lalu</p>
          <p>Aldrin Mursidi</p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste earum
          </p>
          <p
            className="text-danger cursor-pointer hover:text-red-700 mt-1"
            onClick={() => setIsReply(!isReply)}
          >
            {isReply ? "Tutup" : "Komentar"}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 mt-3 rounded-2xl">
        <div className="flex gap-3 ml-20 mt-3">
          <div className="w-[50px]">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              radius="full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">3 hari lalu</p>
            <p className="text-base">Aldrin Mursidi</p>
            <p>Lorem, ipsum dolor sit</p>
          </div>
        </div>

        {isReply && (
          <>
            <div className="flex gap-3 ml-20 items-center mt-1">
              <div>
                <Image
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  radius="full"
                  width={50}
                />
              </div>
              <div className="w-[1280px] mt-3">
                <Textarea
                  placeholder="Tulis balasan kamu disini"
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button color="danger" variant="bordered">
                Kirim
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="mt-8 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          total={10}
          initialPage={1}
          color="danger"
        />
      </div>
    </>
  );
};

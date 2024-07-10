import { Button, Card, CardBody, Divider, Image } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Rate } from "antd";
import { Textarea } from "@nextui-org/react";
import { MdOutlineRateReview } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { useState } from "react";

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

const ReviewPage = () => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <Rate />
        <p className="text-sm">3 hari lalu</p>
      </div>
      <div className="flex gap-3 mt-3 items-center">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <p className="text-base">Aldrin Mursidi</p>
      </div>
      <div className="mt-3">
        <p>
          Super enak ,bahan berkualitas tinggi , higienis,sehat udah bertahun
          tahun langganan di toko ini tidak pernah mengecewakan selalu terjaga
          kualitasnya,sangat rekomendasi toko ini
        </p>
      </div>
      <div className="mt-3 grid grid-cols-4 w-1/5 gap-1 mb-3">
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
      <Divider className="my-4" />
      <div className="flex gap-3 items-center">
        <Rate />
        <p className="text-sm">3 hari lalu</p>
      </div>
      <div className="flex gap-3 mt-3 items-center">
        <div className="w-[50px]">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            radius="full"
          />
        </div>
        <p className="text-base">Aldrin Mursidi</p>
      </div>
      <div className="mt-3">
        <p>
          Super enak ,bahan berkualitas tinggi , higienis,sehat udah bertahun
          tahun langganan di toko ini tidak pernah mengecewakan selalu terjaga
          kualitasnya,sangat rekomendasi toko ini
        </p>
      </div>
      <div className="mt-3 grid grid-cols-4 w-1/5 gap-1 mb-3">
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
          <p className="text-base">Aldrin Mursidi</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="bg-white">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste earum
          </p>
          <p
            className="text-danger cursor-pointer hover:text-red-700 mt-2"
            onClick={() => setIsReply(!isReply)}
          >
            {isReply ? "Tutup" : "Komentar"}
          </p>
        </div>
        <div className="bg-gray-100 p-3 mt-5 rounded-2xl">
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
            </div>
          </div>
          <div className="ml-20 mt-2">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
              earum inventore, dolorum eos commodi totam laudantium nesciunt
              molestiae et atque sint ad iure
            </p>
          </div>

          {isReply && (
            <>
              <div className="flex gap-3 ml-20 items-center mt-3">
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
      </div>
    </>
  );
};

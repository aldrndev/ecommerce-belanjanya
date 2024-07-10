import React, { useState } from "react";
import CardLayout from "./CardLayout";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Pagination,
  Textarea,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";

const DiscussionPage = () => {
  return (
    <CardLayout>
      <div>
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
      </div>

      <div className="mt-3 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          total={10}
          initialPage={1}
          color="danger"
        />
      </div>
    </CardLayout>
  );
};

export default DiscussionPage;

const DiscussionCard = () => {
  const [isReply, setIsReply] = useState(false);
  return (
    <Card shadow="sm" className="mb-5">
      <CardBody>
        <div className="flex justify-between">
          <div className="flex gap-x-5">
            <div>
              <Image
                src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                width={80}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Link to="#">
                <p className="text-sm font-bold hover:text-danger">
                  BukaBlog - Template Toko Online Blogspot mirip Market Pleace
                </p>
              </Link>
              <p className="text-sm">Rp100.000</p>
            </div>
          </div>
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <MoreOutlined />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Hapus</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex gap-3 mt-3 w-full">
          <div className="w-[50px]">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              radius="full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs">3 hari lalu</p>
            <p className="text-sm">Aldrin Mursidi</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="bg-white">
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
            </p>
            <p
              className="text-danger hover:text-red-700 cursor-pointer text-sm mt-2"
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
                <p className="text-xs">3 hari lalu</p>
                <p className="text-sm">Aldrin Mursidi</p>
              </div>
            </div>
            <div className="ml-20 mt-2">
              <p className="text-sm">
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
                  <div className="mt-3 w-full">
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
      </CardBody>
    </Card>
  );
};

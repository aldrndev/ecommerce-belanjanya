import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Empty, Pagination, Rate } from "antd";
import { Textarea } from "@nextui-org/react";
import { MdOutlineRateReview } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDiscussion } from "../../../api/user";
import toast from "react-hot-toast";
import { fetchDiscussionPublic } from "../../../api/public";
import { formatDateOrder } from "../../../utils/formatDate";

const ReviewDiscussionPage = ({ product }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  const handleScroll = () => {
    const parentElement = document.getElementById("diskusi");
    parentElement.scrollIntoView({ behavior: "smooth" });
  };

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
                <ReviewPage product={product} />
              </CardBody>
            </Card>
          </div>
        </Tab>
        <Tab
          key="diskusi"
          id="diskusi"
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
                <DiscussionPage
                  product={product}
                  isLogin={isLogin}
                  handleScroll={handleScroll}
                />
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
const ReviewPage = ({ product }) => {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["review", product?.id, currentPage],
    queryFn: () => fetchReviewPublic(product?.id, currentPage),
  });

  useEffect(() => {
    if (data?.pagination) setTotalPage(data?.pagination?.totalPage);
  }, [data?.pagination]);

  return (
    <>
      {data?.data.length > 0 ? (
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
            </div>
            <div className="mt-8 flex justify-center items-center">
              <Pagination
                current={Number(currentPage)}
                onChange={setCurrentPage}
                total={totalPage * 10}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-y-2">
          <Empty />
          <p>Belum ada ulasan</p>
        </div>
      )}
    </>
  );
};

const DiscussionPage = ({ product, isLogin, handleScroll }) => {
  const [contentNew, setContentNew] = useState("");
  const [contentReply, setContentReply] = useState("");
  const [moreReply, setMoreReply] = useState({});
  const [comment, setComment] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isPending: pendingDiscussion } = useQuery({
    queryKey: ["discussion", product?.id, currentPage],
    queryFn: () => fetchDiscussionPublic(product?.id, currentPage),
    enabled: !!product,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addDiscussion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["discussion"] });
      setContentNew("");
      setContentReply("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e, discussionId) => {
    e.preventDefault();
    mutate({
      contentNew,
      contentReply,
      productId: product.id,
      discussionId,
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const seller =
    localStorage.getItem("isSeller") === "true"
      ? JSON.parse(localStorage.getItem("seller"))
      : null;

  useEffect(() => {
    if (data?.pagination) {
      setTotalPage(data?.pagination?.totalPage);
    }
  }, [data?.pagination]);

  useEffect(() => {
    if (currentPage) handleScroll();
  }, [currentPage]);

  return (
    <>
      {isLogin && (
        <div className="bg-gray-100 p-3 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div>
              <Textarea
                label="Diskusi"
                placeholder="Tulis pertanyaan kamu disini"
                variant="bordered"
                value={contentNew}
                onValueChange={setContentNew}
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button variant="bordered" color="danger" type="submit">
                Kirim
              </Button>
            </div>
          </form>
        </div>
      )}

      {data?.data?.length === 0 ? (
        <div className="flex justify-center items-center flex-col gap-y-1 mt-5">
          <Empty />
          <p>Belum ada diskusi</p>
        </div>
      ) : (
        <>
          {data?.data?.map((msg, index) => (
            <div key={index}>
              <Divider className="my-4" />
              <div className="flex gap-3 mt-3">
                <div className="w-[65px]">
                  <Image
                    src={`http://localhost:3000/${msg?.profile?.image}`}
                    radius="full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">
                    {formatDateOrder(new Date(msg?.createdAt))}
                  </p>
                  <p className="capitalize text-sm">{msg?.profile?.name}</p>

                  <p>{msg?.messages[0]?.content}</p>
                  {isLogin && (
                    <p
                      className="text-danger cursor-pointer hover:text-red-700 mt-1"
                      onClick={() => {
                        setComment({
                          ...comment,
                          [index]: !comment[index],
                        });
                        setMoreReply({
                          ...moreReply,
                          [index]: !moreReply[index],
                        });
                      }}
                    >
                      {comment[index] ? "Tutup" : "Komentar"}
                    </p>
                  )}
                </div>
              </div>

              {msg?.messages?.length > 1 && (
                <div className="bg-gray-100 p-3 mt-3 rounded-2xl">
                  <div>
                    {moreReply[index]
                      ? msg?.messages?.slice(1).map((data, idx) => (
                          <div className="flex gap-3 ml-20 mt-3" key={idx}>
                            <div className="w-[65px]">
                              <Image
                                src={`http://localhost:3000/${
                                  data?.isSeller
                                    ? msg?.Product?.Seller?.image
                                    : msg?.profile?.image
                                }`}
                                radius="full"
                                alt="avatar"
                              />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm">
                                {formatDateOrder(new Date(data?.createdAt))}
                              </p>
                              <div className="flex gap-x-1 items-center">
                                <p className="text-sm capitalize">
                                  {data?.isSeller
                                    ? msg?.Product?.Seller?.name
                                    : msg?.profile?.name}
                                </p>
                                <span>
                                  {data?.isSeller && (
                                    <Chip
                                      size="sm"
                                      color="danger"
                                      variant="flat"
                                    >
                                      Penjual
                                    </Chip>
                                  )}
                                </span>
                              </div>
                              <p>{data?.content}</p>
                            </div>
                          </div>
                        ))
                      : msg?.messages?.slice(1, 3).map((data, idx) => (
                          <div className="flex gap-3 ml-20 mt-5" key={idx}>
                            <div className="w-[65px]">
                              <Image
                                src={`http://localhost:3000/${
                                  data?.isSeller
                                    ? msg?.Product?.Seller?.image
                                    : msg?.profile?.image
                                }`}
                                radius="full"
                                alt="avatar"
                              />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm">
                                {formatDateOrder(new Date(data?.createdAt))}
                              </p>
                              <div className="flex gap-x-1 items-center">
                                <p className="text-sm capitalize">
                                  {data?.isSeller
                                    ? msg?.Product?.Seller?.name
                                    : msg?.profile?.name}
                                </p>
                                <span>
                                  {data?.isSeller && (
                                    <Chip
                                      size="sm"
                                      color="danger"
                                      variant="flat"
                                    >
                                      Penjual
                                    </Chip>
                                  )}
                                </span>
                              </div>
                              <p>{data?.content}</p>
                            </div>
                          </div>
                        ))}
                  </div>
                  {msg?.messages?.length > 3 ? (
                    <div className="ml-20 mt-3">
                      <p
                        className="text-danger cursor-pointer"
                        onClick={() =>
                          setMoreReply({
                            ...moreReply,
                            [index]: !moreReply[index],
                          })
                        }
                      >
                        {moreReply[index]
                          ? "Lihat sedikit"
                          : "Lihat semua balasan"}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}

              {comment[index] && (
                <form onSubmit={(e) => handleSubmit(e, msg?.id)}>
                  <div className="flex gap-3 ml-20 items-center mt-1">
                    <div>
                      <Image
                        src={`http://localhost:3000/${
                          msg?.Product?.Seller.id === seller?.id
                            ? seller?.image
                            : user.image
                        }`}
                        radius="full"
                        alt="avatar"
                        width={60}
                      />
                    </div>
                    <div className="w-[1280px] mt-3">
                      <Textarea
                        placeholder="Tulis balasan kamu disini"
                        variant="bordered"
                        onValueChange={setContentReply}
                        value={contentReply}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button color="danger" variant="bordered" type="submit">
                      Kirim
                    </Button>
                  </div>
                </form>
              )}
            </div>
          ))}

          <div className="mt-8 flex justify-center items-center">
            <Pagination
              current={Number(currentPage)}
              onChange={setCurrentPage}
              total={totalPage * 10}
            />
          </div>
        </>
      )}
    </>
  );
};

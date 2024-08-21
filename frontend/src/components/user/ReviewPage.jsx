import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Image,
  Button,
  Textarea,
  Pagination,
} from "@nextui-org/react";
import CardLayout from "./CardLayout";
import { Link } from "react-router-dom";
import { Form, Rate } from "antd";
import { useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const ReviewPage = () => {
  return (
    <div>
      <CardLayout>
        <div>
          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Options"
              size="lg"
              variant="underlined"
              color="danger"
            >
              <Tab key="Belum diulas" title="Belum diulas">
                <div>
                  <NotReview />
                  <NotReview />
                  <NotReview />
                  <NotReview />
                  <NotReview />
                  <NotReview />
                  <NotReview />
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
              </Tab>
              <Tab key="Sudah diulas" title="Selesai">
                <div>
                  <DoneReview />
                  <DoneReview />
                  <DoneReview />
                  <DoneReview />
                  <DoneReview />
                  <DoneReview />
                  <DoneReview />
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
              </Tab>
            </Tabs>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default ReviewPage;

const NotReview = () => {
  const [value, setValue] = useState(3);
  const desc = ["Sangat Buruk", "Buruk", "Normal", "Baik", "Sangat Baik"];
  const [isReview, setIsReview] = useState(false);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Card shadow="sm" className="mb-4 p-2">
      <CardBody>
        <div className="flex justify-between">
          <div>
            <Link to="/order/1">
              <p className="text-sm text-danger">INV/20240709/MPL/4015868968</p>
            </Link>
          </div>
          <div>
            <p className="text-sm text-gray-400">
              Pesanan diterima: 10 Jul 2024, 16:29
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-3 ">
          <div className="flex justify-start gap-x-3 w-full">
            <div>
              <Image
                src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                width={80}
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <p className="text-sm font-bold">
                gerd zero pro lambung original obat herbal alami
              </p>
              <p className="text-xs text-gray-400">Belum diulas</p>
              {isReview && (
                <div>
                  <div className="flex gap-x-3 mt-3 items-center">
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? (
                      <span className="text-sm">{desc[value - 1]}</span>
                    ) : null}
                  </div>
                  <div className="mt-3 max-w-md">
                    <Textarea placeholder="Tulis ulasan kamu disini" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      Bagikan foto dari produk yang kamu pesan
                    </p>
                    <div className="mt-2">
                      <Form.Item
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload action="/upload.do" listType="picture-card">
                          <button
                            style={{
                              border: 0,
                              background: "none",
                            }}
                            type="button"
                          >
                            <PlusOutlined />
                            <div
                              style={{
                                marginTop: 8,
                              }}
                              className="text-sm"
                            >
                              Upload
                            </div>
                          </button>
                        </Upload>
                        <p className="text-xs text-gray-400 mt-1">
                          Maksimal 4 foto
                        </p>
                      </Form.Item>
                    </div>
                    <div className="flex gap-x-2">
                      <Button
                        variant="bordered"
                        onClick={() => setIsReview(!isReview)}
                      >
                        Batal
                      </Button>
                      <Button variant="solid" color="danger">
                        Kirim
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isReview && (
            <div className="flex justify-end w-full">
              <Button
                color="danger"
                onClick={() => setIsReview(!isReview)}
                size="sm"
              >
                Tulis ulasan
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export const DoneReview = () => {
  const [isReview, setIsReview] = useState(false);
  return (
    <Card shadow="sm" className="mb-4 p-2">
      <CardBody>
        <div className="flex justify-between">
          <div>
            <Link to="/order/1">
              <p className="text-sm text-danger">INV/20240709/MPL/4015868968</p>
            </Link>
          </div>
          <div>
            <p className="text-sm text-gray-400">
              Pesanan diterima: 10 Jul 2024, 16:29
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-3 ">
          <div className="flex justify-start gap-x-3 w-full">
            <div>
              <Image
                src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                width={80}
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <p className="text-sm font-bold">
                gerd zero pro lambung original obat herbal alami
              </p>
              <p className="text-xs text-gray-400">Sudah diulas</p>
              {isReview && (
                <div>
                  <div className="flex gap-x-2 items-center mt-2">
                    <Rate disabled defaultValue={5} />
                    <p className="text-sm">Sangat Baik</p>
                  </div>
                  <div className="mt-2 bg-gray-100 rounded-xl p-5">
                    <p className="text-sm">
                      Barang sudah diterima dengan baik,Barang sudah diterima
                      dengan baik
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-4 w-3/4">
                    <Image
                      src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                      width={60}
                    />
                    <Image
                      src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                      width={60}
                    />
                    <Image
                      src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                      width={60}
                    />
                    <Image
                      src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                      width={60}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Button
              color="danger"
              onClick={() => setIsReview(!isReview)}
              size="sm"
            >
              {isReview ? "Tutup ulasan" : "Lihat ulasan"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

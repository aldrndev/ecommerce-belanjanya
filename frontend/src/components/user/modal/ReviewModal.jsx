import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Form, Rate, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const ReviewModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState(3);
  const desc = ["Sangat Buruk", "Buruk", "Normal", "Baik", "Sangat Baik"];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="flex flex-col gap-2">
      <Button variant="bordered" color="danger" onClick={onOpen}>
        Ulas
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="2xl"
        className="p-2"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Ulas Pesanan
          </ModalHeader>
          <ModalBody>
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
                    onClick={() => onOpenChange(false)}
                  >
                    Batal
                  </Button>
                  <Button variant="solid" color="danger">
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewModal;

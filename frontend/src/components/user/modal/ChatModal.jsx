import {
  Badge,
  Button,
  Card,
  CardBody,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { SearchOutlined, MoreOutlined, SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LiaCheckDoubleSolid } from "react-icons/lia";
const ChatModal = ({ isOpen, onOpenChange }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="4xl"
        className="p-2"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Chat Sekarang
          </ModalHeader>
          <ModalBody>
            <ChatPage />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ChatModal;

const ChatPage = () => {
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex flex-col w-[300px] h-[70vh] shadow-none border-r-small ">
          <div className="mb-4 sticky z-10 bg-white w-[280px]">
            <Input
              placeholder="Search"
              startContent={<SearchOutlined />}
              size="lg"
              fullWidth
            />
          </div>
          <div className="mr-2 overflow-auto">
            <div>
              <ChatUserSidebar />
            </div>
          </div>
        </div>
        <div className="flex-grow ">
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

const ChatUserSidebar = () => {
  return (
    <>
      <div>
        <Link to="/user/chat/1">
          <div
            className="flex justify-between p-2 rounded-2xl mt-2"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#eeeeee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div className="flex gap-x-2 ">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                width={50}
                radius="full"
              />
              <div className="flex flex-col ">
                <p className="text-sm font-semibold">Aldrin Mursidi</p>
                <p className="text-sm text-gray-400">Apa sudah di kirim ?</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs">11:34</p>
              <Badge content="2" color="danger" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const ChatSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center sticky z-10 bg-white w-full">
        <div className="flex gap-x-2 items-center">
          <Image
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            width={50}
            radius="full"
          />
          <div className="flex flex-col ">
            <p className=" font-bold">Aldrin Mursidi</p>
            <p className="text-xs text-gray-400">
              Terakhir online sejam yang lalu
            </p>
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
              <DropdownItem key="new">Hapus chat</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-3">
        <div className="h-[50vh] overflow-auto">
          {/* Sender's Message */}
          <div className="flex justify-end">
            <div className="max-w-xs">
              <Card radius="sm" className="bg-blue-500" shadow="sm">
                <CardBody>
                  <p className="text-white">Hi, How are you ?</p>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="flex justify-end mt-1 mb-4 gap-x-1 items-center">
            <p className="text-gray-400 text-xs">11:50</p>
            <div className="text-primary font-bold">
              <LiaCheckDoubleSolid size={20} />
            </div>
          </div>
          {/* Receiver's Message */}
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-start">
              <div className="max-w-xs">
                <Card radius="sm" className="bg-gray-200" shadow="sm">
                  <CardBody>
                    <p>I'm good, thank you! How about you?</p>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex justify-start text-xs mt-1 mb-4">
              <p className="text-gray-400 text-xs">11:50</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <Input placeholder="Ketik pesan..." size="lg" />
          <Button isIconOnly size="lg" color="danger">
            <SendOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

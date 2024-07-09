import React, { useState } from "react";
import CardLayout from "./CardLayout";
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
} from "@nextui-org/react";
import { SearchOutlined, MoreOutlined, SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ChatPage = () => {
  return (
    <div>
      <CardLayout>
        <div className="flex gap-3">
          <div className="flex flex-col w-[300px] h-[100vh] shadow-none border-r-small ">
            <div className="mb-4 sticky z-10 bg-white w-[280px]">
              <Input
                placeholder="Search"
                startContent={<SearchOutlined />}
                size="lg"
                fullWidth
              />
            </div>
            <div className="mr-3 overflow-auto">
              <div>
                <ChatUserSidebar />
                <ChatUserSidebar />
                <ChatUserSidebar />
                <ChatUserSidebar />
                <ChatUserSidebar />
                <ChatUserSidebar />
                <ChatUserSidebar />
                <ChatUserSidebar />
              </div>
            </div>
          </div>
          <div className="flex-grow ">
            <ChatSection />
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default ChatPage;

const ChatUserSidebar = () => {
  return (
    <>
      <div>
        <Link to="/user/chat/1">
          <div
            className="flex justify-between items-center p-2 rounded-2xl mt-2"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#eeeeee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div className="flex gap-x-2 items-center">
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                width={50}
                radius="full"
              />
              <div className="flex flex-col ">
                <p className="text-sm font-bold">Aldrin Mursidi</p>
                <p className="text-sm">Apa sudah di kirim ?</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-sm">11:34</p>
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
            <p className="text-sm font-bold">Aldrin Mursidi</p>
            <p className="text-xs">Terakhir online sejam yang lalu</p>
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
        <div className="h-[80vh] overflow-auto">
          {/* Sender's Message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
              <p>Hi, how are you? lorem </p>
            </div>
          </div>
          <div className="flex justify-end text-xs mt-1 mb-4">
            <p className="text-gray-400">11:50</p>
          </div>
          {/* Receiver's Message */}
          <div className="flex justify-start">
            <div className="bg-gray-200 text-black p-3 rounded-lg max-w-xs">
              <p>I'm good, thank you! How about you?</p>
            </div>
          </div>
          <div className="flex justify-start text-xs mt-1 mb-4">
            <p className="text-gray-400">11:50</p>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <Input placeholder="Ketik pesan..." size="lg" />
          <Button isIconOnly size="lg">
            <SendOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

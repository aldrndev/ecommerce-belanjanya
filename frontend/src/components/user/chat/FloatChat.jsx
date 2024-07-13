import { MessageOutlined } from "@ant-design/icons";
import { ConfigProvider, FloatButton } from "antd";
import ChatModal from "../modal/ChatModal";
import { useDisclosure } from "@nextui-org/react";

const FloatChat = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#cc0052",
            colorPrimaryHover: "#ff0066",
          },
        }}
      >
        {!isOpen && (
          <FloatButton
            icon={<MessageOutlined />}
            type="primary"
            shape="circle"
            className="w-14 h-14"
            tooltip="Chat Sekarang"
            description="Chat"
            onClick={onOpen}
          />
        )}
      </ConfigProvider>

      <ChatModal onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
  );
};

export default FloatChat;

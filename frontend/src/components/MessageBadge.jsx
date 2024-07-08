import { Badge, Button } from "@nextui-org/react";
import { HiOutlineEnvelope } from "react-icons/hi2";

const MessageBadge = () => {
  return (
    <Badge color="danger" content="2">
      <Button isIconOnly variant="light">
        <HiOutlineEnvelope size={24} />
      </Button>
    </Badge>
  );
};

export default MessageBadge;

import {
  Tooltip,
  Button,
  Badge,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { HiOutlineEnvelope } from "react-icons/hi2";

const MessageHover = () => {
  return (
    <Tooltip content={<Content />} closeDelay={100}>
      <Button isIconOnly variant="light" size="lg">
        <Badge content="2" color="danger">
          <HiOutlineEnvelope size={24} />
        </Badge>
      </Button>
    </Tooltip>
  );
};

export default MessageHover;

const items = [
  {
    key: "new",
    label: "Chat",
  },
  {
    key: "copy",
    label: "Diskusi",
  },
  {
    key: "edit",
    label: "Ulasan",
  },
];
const Content = () => {
  return (
    <div className="w-[200px]">
      <Listbox
        items={items}
        aria-label="Dynamic Actions"
        onAction={(key) => alert(key)}
      >
        {(item) => (
          <ListboxItem key={item.key} color={"default"}>
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};

import {
  Tooltip,
  Button,
  Badge,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";

const MessageHover = () => {
  return (
    <Tooltip content={<Content />} closeDelay={100}>
      <Button as={Link} to={"/user/chat"} isIconOnly variant="light" size="lg">
        <Badge content="0" color="danger">
          <HiOutlineEnvelope size={24} />
        </Badge>
      </Button>
    </Tooltip>
  );
};

export default MessageHover;

const items = [
  {
    key: "fitur sedang dalam pengembangan 1",
    label: "Chat",
  },
  {
    key: "fitur sedang dalam pengembangan 2",
    label: "Diskusi",
  },
  {
    key: "fitur sedang dalam pengembangan 3",
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

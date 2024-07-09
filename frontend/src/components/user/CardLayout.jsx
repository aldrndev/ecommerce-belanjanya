import { Card, CardBody } from "@nextui-org/react";

const CardLayout = ({ children }) => {
  return (
    <Card radius="md" className="p-2" shadow="sm">
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardLayout;

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import React from "react";

const PaymentModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col gap-2">
      <Button variant="bordered" color="danger" onClick={onOpen}>
        Pembayaran
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
            Pilih Metode Pembayaran
          </ModalHeader>
          <ModalBody>Pembayaran</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PaymentModal;

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Steps } from "antd";
import React from "react";

const TrackingOrder = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col gap-2">
      <Button variant="bordered" color="danger" onClick={onOpen}>
        Lacak
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
            Lacak Pengiriman
          </ModalHeader>
          <ModalBody>
            <Steps progressDot current={0} direction="vertical" size="small">
              <Steps.Step
                title="Transaksi selesai"
                subTitle={
                  <>
                    <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
                  </>
                }
                description="Pemesanan selesai, Dana akan diteruskan ke penjual"
              />
              <Steps.Step
                title="Pesanan telah tiba di tujuan"
                subTitle={
                  <>
                    <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
                  </>
                }
                description="Received by Aldrin Mursidi"
              />
              <Steps.Step
                title="Pesanan telah dikirim"
                subTitle={
                  <>
                    <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
                  </>
                }
                description="Pesanan Anda dalam proses pengiriman oleh kurir"
              />
              <Steps.Step
                title="Diproses penjual"
                subTitle={
                  <>
                    <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
                  </>
                }
                description="Pesanan sedang diproses oleh penjual"
              />
              <Steps.Step
                title="Pembayaran sudah diverifikasi"
                subTitle={
                  <>
                    <div className="text-xs mb-2">9 Jul 2024, 13:13 WIB</div>
                  </>
                }
                description="Pembayaran telah diterima dan pesanan kamu sudah diteruskan ke penjual"
              />
            </Steps>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TrackingOrder;
